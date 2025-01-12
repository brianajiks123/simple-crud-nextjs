"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Post({ params }) {
    const id = params.id;
    const searchQuery = useSearchParams()
    const mode = searchQuery.get('mode')

    const [post, setPost] = useState(null);
    const [editing, setEditing] = useState(mode === "edit")
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id])

    useEffect(() => {
        setEditing(mode === "edit")
    }, [mode])

    const fetchPost = async () => {
        const res = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:5000/posts/${id}`, {title, content})
        setEditing(false)
        fetchPost()
    }

    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/posts/${id}`)
        router.push("/")
    }

    return (
        <div className="py-20">
            <h1 className="text-3xl text-center">{editing ? "Edit Post" : "Read Post"}</h1>
            {post && (
                <div className="flex flex-col items-center">
                    {editing ? (
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6 border p-6">
                            <input type="text" placeholder="Title" value={title} className="p-2 border border-slate-600" onChange={(e) => setTitle(e.target.value)} />
                            <textarea value={content} className="p-2 border border-slate-600" onChange={(e) => setContent(e.target.value)} />
                            <button className="w-full bg-blue-500 text-white rounded p-2">Update</button>
                        </form>
                    ) : (
                        <div className="mt-5">
                            <h1 className="text-2xl font-bold">{post.title}</h1>
                            <p>{post.content}</p>
                        </div>
                    )}

                    <div className="flex space-x-4 mt-5">
                        <button onClick={() => router.push("/")} className="w-full bg-green-200 px-3 py-1.5">Home</button>
                        <button onClick={() => setEditing(!editing)} className="w-full bg-blue-200 px-3 py-1.5">Edit</button>
                        <button className="w-full bg-red-200 px-3 py-1.5" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}