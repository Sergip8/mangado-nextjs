import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function PrevNext({
  chapters,
  params,
  searchParams,
}: {
  chapters: number[];
  params: any;
  searchParams: any;
}) {
  const capNum = params.chapterNum;
 
  return (
    <div>
      <div className="flex  gap-3 items-center">
        <Link
          href={`/visor/${params.id}/${params.name}/${
            chapters[chapters.indexOf(capNum) - 1]
          }?screen=${searchParams.screen}`}
          className={
            chapters.indexOf(capNum) === 0 ? "pointer-events-none" : ""
          }
          aria-disabled={chapters.indexOf(capNum) === 0}
          tabIndex={chapters.indexOf(capNum) === 0 ? -1 : undefined}
        >
          <svg
            className=" text-slate-600 dark:text-slate-100 fill-current h-6 w-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            />
            <path d="M13.2599 16.2802C13.0699 16.2802 12.8799 16.2102 12.7299 16.0602L9.19992 12.5302C8.90992 12.2402 8.90992 11.7602 9.19992 11.4702L12.7299 7.94016C13.0199 7.65016 13.4999 7.65016 13.7899 7.94016C14.0799 8.23016 14.0799 8.71016 13.7899 9.00016L10.7899 12.0002L13.7899 15.0002C14.0799 15.2902 14.0799 15.7702 13.7899 16.0602C13.6499 16.2102 13.4599 16.2802 13.2599 16.2802Z" />
          </svg>
        </Link>
        <div>Capitulo {params.chapterNum}</div>
        <Link
          href={`/visor/${params.id}/${params.name}/${
            chapters[chapters.indexOf(capNum) + 1]
          }?screen=${searchParams.screen}`}
          className={
            chapters.indexOf(capNum) === chapters.length - 1
              ? "pointer-events-none"
              : ""
          }
          aria-disabled={chapters.indexOf(capNum) === chapters.length - 1}
          tabIndex={
            chapters.indexOf(capNum) === chapters.length - 1 ? -1 : undefined
          }
        >
          <svg
            className=" text-slate-600 dark:text-slate-100 fill-current h-6 w-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            />
            <path d="M10.7397 16.2802C10.5497 16.2802 10.3597 16.2102 10.2097 16.0602C9.91969 15.7702 9.91969 15.2902 10.2097 15.0002L13.2097 12.0002L10.2097 9.00016C9.91969 8.71016 9.91969 8.23016 10.2097 7.94016C10.4997 7.65016 10.9797 7.65016 11.2697 7.94016L14.7997 11.4702C15.0897 11.7602 15.0897 12.2402 14.7997 12.5302L11.2697 16.0602C11.1197 16.2102 10.9297 16.2802 10.7397 16.2802Z" />
          </svg>
        </Link>

        <Link
          href={`/visor/${params.id}/${params.name}/${capNum}?screen=${
            searchParams.screen === "adjust" || !searchParams.screen
              ? "wide"
              : "adjust"
          }`}
        >
          {searchParams.screen === "adjust" || !searchParams.screen ? (
            <div>
              <svg
                className=" h-7 w-7"
                viewBox="0 0 130 80"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="stroke-slate-600 dark:stroke-slate-100"
                  strokeWidth="10"
                  fill="none"
                  d="M41.286 5.817h42M41.703.808l-.167 83.844M84.203.808l-.333 84.333M36.536 84.489l52.333.163M32.703 43.463 5.536 43.3M119.703 43.633l-27-.163M20.036 27.508 4.203 46.393M4.036 40.206l16 18.723M105.37 28.004l16 18.722"
                />
                <path
                  className="stroke-slate-600 dark:stroke-slate-100"
                  d="m121.37 40.54-15.833 18.885"
                  opacity="undefined"
                  strokeWidth="10"
                />
              </svg>
            </div>
          ) : (
            <div>
              <svg
                className=" h-7 w-7"
                viewBox="0 0 130 79"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="stroke-slate-600 dark:stroke-slate-100"
                  strokeWidth="10"
                  fill="none"
                  d="M41.286 5.817h42M41.703.808l-.167 83.844M84.203.808l-.333 84.333M36.536 84.489l52.333.163M125.036 43.463 97.869 43.3M27.703 43.3l-27-.163M112.369 27.508 96.536 46.393M96.369 40.206l16 18.723M13.37 27.671l16 18.722"
                />
                <path
                  className="stroke-slate-600 dark:stroke-slate-100"
                  d="M29.37 40.207 13.537 59.092"
                  opacity="undefined"
                  strokeWidth="10"
                />
              </svg>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

export default PrevNext;
