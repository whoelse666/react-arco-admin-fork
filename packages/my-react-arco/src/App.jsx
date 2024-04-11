import "./App.css";
import { useEffect, useState } from "react";
import { useRequest, usePagination } from "ahooks";
import { Input, Form, Drawer, Button, Layout, Table } from "@arco-design/web-react";
const Header = Layout.Header;
const Content = Layout.Content;
const Sider = Layout.Sider;
const Footer = Layout.Footer;
const tableCallback = (record, operation) => {
  console.log("操作", operation);
  console.log("记录", record);
};

 

const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Salary",
    dataIndex: "salary"
  },
  {
    title: "Address",
    dataIndex: "address"
  },
  {
    title: "Email",
    dataIndex: "email"
  },
  {
    title: "操作",
    dataIndex: "operations",
    render: (_, record) => (
      <>
        <Button type="text" size="small" onClick={() => tableCallback(record, "edit")}>
          编辑
        </Button>
        <Button type="text" size="small" onClick={() => tableCallback(record, "delete")}>
          删除
        </Button>
      </>
    )
  }
];
const initData = [
  {
    key: "1",
    name: "Jane Doe",
    salary: 23000,
    address: "32 Park Road, London",
    email: "jane.doe@example.com"
  },
  {
    key: "2",
    name: "Alisa Ross",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com"
  },
  {
    key: "3",
    name: "333",
    salary: 25000,
    address: "35 Park Road, 333",
    email: "alisa.ross@example.com"
  }
];

const getTableData = ({ current, pageSize }) => {
  console.log("current, pageSize ", current, pageSize);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: initData.slice((current - 1) * pageSize, current * pageSize),
        total: initData.length
      });
    }, 1000);
  });
};

function App() {
  /*   // 表格数据
  const [data, setData] = useState([]);
  // 应用首次进入获取一次数据
  // 如果页码和页面尺寸变化再次获取数据
  useEffect(() => {
    const {data, total} = getTableData(pagination)
    setData(data);
    setPagination({ ...pagination, total });
  }, [pagination.current, pagination.pageSize]); */
  /*   // 分页信息
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
    total: 0
  });
  const { data, loading } = useRequest(() => getTableData(pagination), {
    onSuccess: ({ total }) => setPagination({ ...pagination, total }),
    refreshDeps: [pagination.current, pagination.pageSize]
  });
    // 用户切换页码
  const onChange = pagination => {
    setPagination(pagination);
  };
  */
  // 这里 service 默认接收 { current, pageSize }
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
  const { data, pagination, loading } = usePagination(getTableData, {
    defaultCurrent: 1,
    defaultPageSize: 2
  });

  return (
    <Layout style={{ height: "100%" }}>
      <Header>Header</Header>
      <Layout>
        <Sider>
          Sider{" "}
          <Button
            onClick={() => {
              setVisible(true);
            }}
            type="primary"
          >
            Open Drawer
          </Button>
        </Sider>
        <Content>
          <Table columns={columns} data={data?.data} pagination={pagination} loading={loading} />
        </Content>
      </Layout>
      <Footer>Footer</Footer>

      <Drawer
        width={332}
        title={<span>Basic Information </span>}
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form form={form}>
          <Form.Item label="用户名" field="username">
            <Input placeholder="请输入用户名"></Input>
          </Form.Item>
          <Form.Item label="密码" field="password">
            <Input type="password" placeholder="请输入密码"></Input>
          </Form.Item>
          <Form.Item>
            <Button
              style={{ marginRight: 24 }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                form.setFieldsValue({
                  username: "admin",
                  password: "adminpassword"
                });
              }}
            >
              Fill Form
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Layout>
  );
}
export default App;



