"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsFeed = void 0;
var react_1 = require("react");
var NewsFeed = function (_a) {
    var posts = _a.posts, onAddPost = _a.onAddPost, onDeletePost = _a.onDeletePost, onUpdatePost = _a.onUpdatePost, isAdmin = _a.isAdmin, currentUser = _a.currentUser;
    var _b = (0, react_1.useState)(false), isCreating = _b[0], setIsCreating = _b[1];
    var _c = (0, react_1.useState)(''), articleTitle = _c[0], setArticleTitle = _c[1];
    var _d = (0, react_1.useState)(''), articleBody = _d[0], setArticleBody = _d[1];
    var _e = (0, react_1.useState)(null), activeCommentPostId = _e[0], setActiveCommentPostId = _e[1];
    var _f = (0, react_1.useState)(''), commentInput = _f[0], setCommentInput = _f[1];
    // Filter ONLY news posts for this view
    var newsPosts = posts.filter(function (p) { return p.type === 'NEWS'; }).sort(function (a, b) { return b.timestamp - a.timestamp; });
    var handlePublish = function () {
        if (!articleTitle.trim() || !articleBody.trim() || !currentUser)
            return;
        var newArticle = {
            id: "news-".concat(Date.now()),
            type: 'NEWS',
            authorName: currentUser.name,
            authorAvatar: currentUser.avatarUrl,
            title: articleTitle,
            caption: articleBody,
            timestamp: Date.now(),
            likes: [],
            dislikes: [],
            shares: 0,
            comments: []
        };
        onAddPost(newArticle);
        setIsCreating(false);
        setArticleTitle('');
        setArticleBody('');
    };
    var handlePostComment = function (postId) {
        if (!commentInput.trim() || !currentUser || !onUpdatePost)
            return;
        var post = newsPosts.find(function (p) { return p.id === postId; });
        if (!post)
            return;
        var newComment = {
            id: "c-".concat(Date.now()),
            userId: currentUser.id,
            author: currentUser.name,
            text: commentInput.trim(),
            timestamp: Date.now()
        };
        onUpdatePost(__assign(__assign({}, post), { comments: __spreadArray(__spreadArray([], post.comments, true), [newComment], false) }));
        setCommentInput('');
    };
    var handleReaction = function (postId, emoji) {
        var _a;
        if (!currentUser || !onUpdatePost)
            return;
        var post = newsPosts.find(function (p) { return p.id === postId; });
        if (!post)
            return;
        var reactions = post.reactions || {};
        var currentRes = reactions[emoji] || [];
        var nextRes = __spreadArray([], currentRes, true);
        if (nextRes.includes(currentUser.id)) {
            nextRes = nextRes.filter(function (id) { return id !== currentUser.id; });
        }
        else {
            nextRes.push(currentUser.id);
        }
        var nextReactions = __assign(__assign({}, reactions), (_a = {}, _a[emoji] = nextRes, _a));
        onUpdatePost(__assign(__assign({}, post), { reactions: nextReactions }));
    };
    return (<div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in">
            <div className="flex justify-between items-center px-4">
                <h2 className="text-xl font-serif font-black text-slate-900 uppercase tracking-widest border-b-4 border-slate-900 pb-1">
                    Official News Board
                </h2>
                {isAdmin && !isCreating && (<button onClick={function () { return setIsCreating(true); }} className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 shadow-lg transition-all">
                        + Write Article
                    </button>)}
            </div>

            {isCreating && (<div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-200 animate-in zoom-in-95">
                    <h3 className="text-lg font-black text-slate-900 mb-6">Draft New Article</h3>
                    <div className="space-y-4">
                        <input value={articleTitle} onChange={function (e) { return setArticleTitle(e.target.value); }} placeholder="Headline..." className="w-full text-2xl font-serif font-black bg-slate-50 border-none outline-none p-4 rounded-xl placeholder:text-slate-300" autoFocus/>
                        <textarea value={articleBody} onChange={function (e) { return setArticleBody(e.target.value); }} placeholder="Article content..." rows={8} className="w-full bg-slate-50 border-none outline-none p-4 rounded-xl resize-none font-medium text-slate-700 placeholder:text-slate-300"/>
                        <div className="flex gap-4 pt-4">
                            <button onClick={function () { return setIsCreating(false); }} className="flex-1 py-4 text-slate-400 font-black uppercase text-xs hover:bg-slate-50 rounded-xl">Cancel</button>
                            <button onClick={handlePublish} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-xs hover:bg-indigo-500 shadow-lg">Publish Article</button>
                        </div>
                    </div>
                </div>)}

            {newsPosts.length === 0 && !isCreating ? (<div className="text-center py-20 opacity-40">
                    <span className="text-6xl block mb-4">📰</span>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">No official news yet.</p>
                </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {newsPosts.map(function (post) { return (<article key={post.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative">
                            {isAdmin && onDeletePost && (<button onClick={function () { if (confirm('Delete article?'))
                    onDeletePost(post.id); }} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 font-bold z-10">
                                    ✕
                                </button>)}
                            <div className="mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black">
                                    {post.authorName.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-900">{post.authorName}</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(post.timestamp).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <h3 className="text-2xl font-serif font-black text-slate-900 mb-4 leading-tight group-hover:text-indigo-700 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
                                {post.caption}
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-50 pt-4">
                                <div className="flex gap-1.5">
                                    {['🔥', '👏', '🏏', '❤️'].map(function (emoji) {
                    var _a, _b, _c, _d;
                    var count = ((_b = (_a = post.reactions) === null || _a === void 0 ? void 0 : _a[emoji]) === null || _b === void 0 ? void 0 : _b.length) || 0;
                    var isActive = (_d = (_c = post.reactions) === null || _c === void 0 ? void 0 : _c[emoji]) === null || _d === void 0 ? void 0 : _d.includes((currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) || '');
                    return (<button key={emoji} onClick={function () { return handleReaction(post.id, emoji); }} className={"hover:scale-110 transition-transform px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 ".concat(isActive ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200' : 'bg-slate-50 text-slate-400')}>
                                                <span>{emoji}</span>
                                                {count > 0 && <span>{count}</span>}
                                            </button>);
                })}
                                </div>
                                <button onClick={function () { return setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id); }} className={"text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors ".concat(activeCommentPostId === post.id ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600')}>
                                    💬 {post.comments.length}
                                </button>
                                <button className="ml-auto text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-700">Read Full Story →</button>
                            </div>

                            {activeCommentPostId === post.id && (<div className="mt-4 p-4 bg-slate-50 rounded-2xl animate-in slide-in-from-top-2 border border-slate-100">
                                    <div className="space-y-3 mb-4 max-h-40 overflow-y-auto no-scrollbar">
                                        {post.comments.map(function (c) { return (<div key={c.id} className="flex flex-col">
                                                <span className="font-black text-slate-900 text-[9px] uppercase tracking-widest">{c.author}</span>
                                                <span className="text-slate-600 text-xs font-medium">{c.text}</span>
                                            </div>); })}
                                        {post.comments.length === 0 && <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center py-2">No comments yet</p>}
                                    </div>
                                    <div className="flex gap-2">
                                        <input value={commentInput} onChange={function (e) { return setCommentInput(e.target.value); }} onKeyDown={function (e) { return e.key === 'Enter' && handlePostComment(post.id); }} placeholder="Write a comment..." className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100"/>
                                        <button onClick={function () { return handlePostComment(post.id); }} className="bg-slate-900 text-white px-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors">Post</button>
                                    </div>
                                </div>)}
                        </article>); })}
                </div>)}
        </div>);
};
exports.NewsFeed = NewsFeed;
