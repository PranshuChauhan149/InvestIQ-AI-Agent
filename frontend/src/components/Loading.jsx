import React from 'react';

const Loading = () => {
  return (
    <div className="mx-auto mt-12 flex max-w-md items-center justify-center rounded-[30px] border border-cyan-400/20 bg-slate-900/75 px-8 py-10 shadow-[0_20px_70px_rgba(11,18,32,0.75)] backdrop-blur">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-cyan-400/30"></div>
        <div className="absolute inset-2 rounded-full border-4 border-cyan-400/20 border-t-cyan-300 animate-spin"></div>
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 opacity-30 blur-md"></div>
        <div className="relative h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.95)]"></div>
      </div>
    </div>
  );
};

export default Loading;
