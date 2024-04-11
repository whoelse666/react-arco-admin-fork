import React, { useState } from 'react';
import {
  Button,
  Card,
  Message,
  PaginationProps,
  Popconfirm,
  Space,
  Table,
  TableColumnProps,
  Typography,
} from '@arco-design/web-react';
import { usePagination } from 'ahooks';
const Title = Typography.Title;
import DrawerForm from './form';
export const initial = {
  _id: '',
  phoneNumber: '',
  password: '',
  name: '',
  avatar: '',
  email: '',
  job: '',
  jobName: '',
  organization: '',
  location: '',
  personalWebsite: '',
};

export type User = typeof initial;

export default function UserPage() {
  const columns: TableColumnProps[] = [
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
    },
    {
      title: '用户名称',
      dataIndex: 'name',
    },
    {
      title: '用户头像',
      dataIndex: 'avatar',
      render(value: string) {
        return <img src={value} width="50" />;
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      placeholder: '-',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      render: (_: unknown, record) => (
        <>
          <Button
            type="text"
            size="small"
            onClick={() => tableCallback(record, 'edit')}
          >
            编辑
          </Button>
          <Popconfirm
            focusLock
            title="确认删除吗?"
            okText="确认"
            cancelText="取消"
            onOk={() => tableCallback(record, 'delete')}
          >
            <Button type="text" size="small">
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const [editedItem, setEditedItem] = useState(initial);
  const [visible, setVisible] = useState(false);
  const onAdd = () => {
    setEditedItem(initial);
    setVisible(true);
  };

  const tableCallback = async (record, operation) => {
    if (operation === 'delete') {
      const { ok } = await deleteTableData(record._id);
      if (ok) {
        Message.success('删除用户成功');
        refresh();
      } else {
        Message.error('删除用户失败，请重试！');
      }
    } else if (operation === 'edit') {
      setEditedItem(record);
      setVisible(true);
    }
  };
  async function getTableData(pagination: PaginationProps) {
    const {
      data: list,
      meta: { total },
    } = await fetch(
      `/api/user?pageSize=${pagination.pageSize}&page=${pagination.current}`
    ).then((res) => res.json());
    return { list, total };
  }

  const { data, pagination, loading, refresh } = usePagination(getTableData, {
    defaultCurrent: 1,
    defaultPageSize: 2,
  });

  async function deleteTableData(id: string) {
    const res = await fetch(`/api/user/${id}`, { method: 'delete' });
    const json = await res.json();
    return { ok: json.affected === 1 };
  }

  return (
    <>
      <Card>
        {/* 标题 */}
        <Title heading={6}>用户管理</Title>
        <Space direction="vertical">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button onClick={onAdd}>新增</Button>
            {/* 数据表格 */}
            <Table
              data={data?.list}
              loading={loading}
              columns={columns}
              pagination={pagination}
              rowKey="_id"
              style={{ width: '100%' }}
            ></Table>
          </Space>
        </Space>
      </Card>
      <DrawerForm
        {...{
          visible,
          setVisible,
          editedItem,
          setEditedItem,
          callback: () => refresh(),
        }}
      ></DrawerForm>
    </>
  );
}
