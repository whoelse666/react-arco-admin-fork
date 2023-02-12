import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import { ArticleViewer } from "../../components/article-viewer";
import { getArticle } from "../../libs/article";
import { flatMenu, getMenu, getMenuIds } from "../../libs/menu";
import { useNeedLogin } from "../../libs/user";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm } from "../../components/confirm";

// 生成 `/posts/1`,`/posts/2`,...
export async function getStaticPaths() {
  const menu = await getMenu();
  const paths = getMenuIds(menu);
  return {
    paths,
    fallback: "blocking", // for ISR
  };
}

// `getStaticPaths` 要求使用 `getStaticProps`
export async function getStaticProps({ params }) {
  const menu = await getMenu();
  // 根据id获取对应文章内容
  const article = await getArticle(params.id);
  return {
    // 作为属性传递给页面组件
    props: { menu: flatMenu(menu), article },
  };
}

export default function Article({ menu, article }) {
  // 如果不满足登录或新用户要求，需要重新登录
  const { needLogin, message } = useNeedLogin();
  const router = useRouter();

  return (
    <Layout menu={menu}>
      <Head>
        <title>{article.title}</title>
      </Head>
      {needLogin ? (
        <Confirm
          message={message}
          callback={() => router.push(`/login?callback=/posts/${article._id}`)}
        ></Confirm>
      ) : (
        <div className="prose max-w-full">
          <h1 className="pl-5 mt-4">{article.title}</h1>{" "}
          <ArticleViewer article={article}></ArticleViewer>
        </div>
      )}
    </Layout>
  );
}
