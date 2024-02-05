// /pages/index.tsx
import Head from "next/head";
import { gql, useQuery, useMutation } from "@apollo/client";
import type { Link as Node } from "@prisma/client";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { LinkMark } from "../components/LinkMark";

// const AllLinksQuery = gql`
//   query allLinksQuery($first: Int, $after: ID) {
//     links(first: $first, after: $after) {
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//       edges {
//         cursor
//         node {
//           imageUrl
//           url
//           title
//           category
//           description
//           id
//         }
//       }
//     }
//   }
// `;


const AllLinksQuery = gql`
  query {
    links {
      id
      title
      url
      description
      imageUrl
      category
    }
  }
`;


function Home() {
  const { user } = useUser()
  const { data, loading, error, fetchMore } = useQuery(AllLinksQuery, {
    variables: { first: 3 },
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        To view bookmarked links you need to &#160; {' '}
        <Link href="/api/auth/login" className=" block bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Login
        </Link>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { endCursor, hasNextPage } = data?.links.pageInfo;

  return (
    <div>
      <Head>
        <title>linkMark</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.links.map((link) => (
            <Link href={`/link`}>
              <LinkMark
                key={link.id}
                title={link.title}
                category={link.category}
                url={link.url}
                id={link.id}
                description={link.description}
                imageUrl={link.imageUrl}
              />
            </Link>
          ))}
          
        </div>
        {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.links.edges = [
                    ...prevResult.links.edges,
                    ...fetchMoreResult.links.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            End of the line, bookmark new links!{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
