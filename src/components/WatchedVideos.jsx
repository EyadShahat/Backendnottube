import React from "react";
import ShellLayout from "./ShellLayout.jsx";
import { useNotTube } from "../state/NotTubeState.jsx";

export default function WatchedVideos() {
  const { watchedIds, videos } = useNotTube();
  const items = videos.filter(v => watchedIds.includes(String(v.id)));

  return (
    <ShellLayout active="watched">
      <style>{`
        .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:16px; }
        .card { text-decoration:none; color:inherit; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden; background:#fff; display:flex; flex-direction:column; }
        .thumb { aspect-ratio:16/9; background:#d1d5db; overflow:hidden; position:relative; }
        .thumbMedia { width:100%; height:100%; object-fit:cover; display:block; }
        .len { position:absolute; right:8px; bottom:8px; background:rgba(17,24,39,.8); color:#fff; font-size:12px; padding:2px 6px; border-radius:6px; }
        .meta { padding:10px; display:flex; gap:10px; align-items:flex-start; }
        .ava { width:34px; height:34px; border-radius:999px; background:#0f172a center/cover no-repeat; flex:0 0 auto; }
        .ttl { font-weight:700; font-size:14px; line-height:1.3; }
        .by { color:#6b7280; font-size:12.5px; margin-top:2px; display:flex; gap:6px; align-items:center; }
        .empty { color:#6b7280; }
      `}</style>

      <h2 style={{margin:"0 0 12px"}}>Watch history</h2>
      {items.length === 0 ? (
        <div className="empty">You have not watched anything yet.</div>
      ) : (
        <div className="grid">
          {items.map(v=>(
            <a key={v.id} href={`#/video/${v.id}`} className="card">
              <div className="thumb">
                {v.thumb ? (
                  <img className="thumbMedia" src={v.thumb} alt="" />
                ) : (
                  <video className="thumbMedia" src={v.src} muted playsInline preload="metadata" />
                )}
                <span className="len">{v.length || "0:00"}</span>
              </div>
              <div className="meta">
                <div className="ava" style={v.avatarUrl ? { backgroundImage:`url(${v.avatarUrl})` } : undefined} />
                <div>
                  <div className="ttl">{v.title}</div>
                  <div className="by">
                    <span>{v.channelName || v.channel}</span>
                    <span>•</span>
                    <span>{v.views || 0} views</span>
                    {v.createdAt && <><span>•</span><span>{new Date(v.createdAt).toLocaleDateString()}</span></>}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </ShellLayout>
  );
}
