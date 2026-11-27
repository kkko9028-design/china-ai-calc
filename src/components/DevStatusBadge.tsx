"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EyeOff, Terminal, X } from "lucide-react";

export function DevStatusBadge() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  // Only render in local development mode; completely absent in production builds
  if (process.env.NODE_ENV !== "development" || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 font-sans">
      {open ? (
        <div className="w-72 rounded-2xl border border-emerald-400/30 bg-[#050b16]/95 p-4 text-xs text-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.75)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
            <div className="flex items-center gap-2 font-semibold text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              本地开发预览面板
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
              title="收起"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-3 space-y-2 text-[11px] text-slate-400">
            <div className="flex items-center justify-between rounded-lg bg-black/40 px-2.5 py-1.5">
              <span>当前路径</span>
              <span className="max-w-[165px] truncate font-mono text-emerald-300">
                {pathname}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-black/40 px-2.5 py-1.5">
              <span>页面总数</span>
              <span className="font-mono text-slate-200">38 个静态页</span>
            </div>
          </div>

          <div className="mt-3">
            <p className="mb-1.5 text-[11px] font-semibold text-slate-300">
              快捷跳页检查
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <Link
                href="/"
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
              >
                首页计算器
              </Link>
              <Link
                href="/compare/gpt-6-2-astra-vs-deepseek-v4-pro/"
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
              >
                对比详情页
              </Link>
              <Link
                href="/models/qwen-4-max/"
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
              >
                模型指南页
              </Link>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
              >
                站点地图 XML
              </a>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-2.5 text-[10px] text-slate-500">
            <span>正式上线后本球自动消失</span>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="inline-flex items-center gap-1 text-slate-400 transition hover:text-rose-300"
            >
              <EyeOff className="h-3 w-3" />
              本次隐藏
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2 rounded-full border border-emerald-400/30 bg-[#050b16]/90 px-3.5 py-2 text-xs font-medium text-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.65)] backdrop-blur-xl transition hover:border-emerald-400/60 hover:text-white"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <Terminal className="h-3.5 w-3.5 text-emerald-400" />
          <span>本地预览中</span>
        </button>
      )}
    </div>
  );
}
