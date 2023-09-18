import Head from "next/head";
import Image from "next/image";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import styles from "@/pages/index.module.css";
import QuickSearch from "@/components/QuickSearch/QuickSearch";
import CharactersList from "@/components/CharactersList/CharactersList";
import { ApiResponse } from "types/ApiResponse";

import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

import "bootstrap/dist/css/bootstrap.min.css";
import { fetchApi } from "utils/fetchApi";

export default function Home({
  data,
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handlePageClick = (event: any) => {
    const { pathname, query } = router;

    query.page = event.selected + 1;

    router.push({ pathname, query });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Rick and Morty App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Browse the Rick and Morty Characters"
        />
      </Head>

      <main>
        <h1 className={styles.title}>List of characters</h1>

        <QuickSearch />
        <CharactersList characters={data.results} />

        <div className={styles.paginationCnt}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={data.info.pages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </main>

      <footer className={styles.footer}>Rick and Morty App</footer>
    </div>
  );
}

type QueryParams = {
  name?: string;
  page?: number;
};

export const getServerSideProps = async ({ query }: { query: QueryParams }) => {
  const name = query.name || "";
  const page = query.page || 0;

  const data: ApiResponse = await fetchApi(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`
  );
  return { props: { data, page } };
};
