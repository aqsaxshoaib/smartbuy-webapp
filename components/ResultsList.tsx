"use client";
import React from 'react';
import { PageResult } from "@/typings";
import Link from "next/link";
import Filters from "./Filters";
import { useRouter } from "next/navigation";

type Props = {
  results: PageResult[];
  term: string;
};

const ResultsList: React.FC<Props> = ({ results, term }) => {
  const router = useRouter();

  const handleSearch = () => {
    // Constructing the URL with query parameters
    const params = new URLSearchParams();
    // Add other query parameters as needed
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-4 gap-10">
      <div className="hidden md:block">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <aside className="px-4 py-8 border border-gray-200 send-to-back bg-grey rounded shadow-sm">
            <Filters />
          </aside>
        </div>
      </div>

      {/* Main content */}
      <div className="md:col-span-3">
        <div className="px-5 md:p-10 md:pt-0 space-y-5 flex-1">
          {results.map((pageResult, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {i !== 0 && <hr className="w-full col-span-full" />}

              <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 py-5">
                <div className="flex space-x-2 items-center divide-x-2">
                  <h1>Shop On SmartBuy</h1>
                  <h2 className="text-xl font-semibold pl-2">Search Results for Page {i + 1}</h2>
                </div>
                <h3 className="font-extralight">Showing results for &quot;{decodeURIComponent(term)}&quot;</h3>
              </div>

              {pageResult.content.results.organic.map((item) => (
                <Link
                  key={item.pos}
                  href={item.url.includes("url?url=") ? item.url.split("url?url=")?.[1] : item.url.split("?")?.[0]}
                  prefetch={false}
                  className={`border rounded-2xl flex flex-col hover:shadow-lg transition duration-200 ease-in-out ${item.url.includes("url?url=") && "italic"}`}
                >
                  <div className="border-b p-5 flex-1">
                    <p className="text-[#1B66D2]">{item.title}</p>
                  </div>
                  <div className="px-2 py-2 not-italic">
                    <p className="font-light">{item.price_str} {item.currency}</p>
                    <p className="text-[#1B66D2] font-semibold">{item.merchant.name}</p>
                  </div>
                  <div>
                    <p>{item.image_url}</p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsList;
