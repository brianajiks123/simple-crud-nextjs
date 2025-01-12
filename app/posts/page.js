"use client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Posts() {
    const [posts, setPosts] = useState([])

    const fetchRecords = async () => {
        const res = await axios.get("http://localhost:5000/posts")
        setPosts(res.data)
    }
    
    useEffect(() => {
        fetchRecords()
    }, [])

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/posts/${id}`)
        const filterData = posts.filter(post => post.id !== id)
        setPosts(filterData)
    }

    return (
        <div className="px-48 py-20">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <Link href="/posts/create" className="px-4 py-2 bg-green-600 rounded text-white">Add New Post</Link>
            </div>
            <table className="divide-y divide-gray-300 w-full mt-8">
                <thead className="bg-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-start font-medium text-gray-600 uppercase">ID</th>
                        <th scope="col" className="px-6 py-3 text-start font-medium text-gray-600 uppercase">Title</th>
                        <th scope="col" className="px-6 py-3 text-start font-medium text-gray-600 uppercase">Content</th>
                        <th scope="col" className="px-6 py-3 text-start font-medium text-gray-600 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                    {
                        posts.map((post) => (
                            <tr key={post.id}>
                                <td className="px-6 py-3 text-gray-900">{post.id}</td>
                                <td className="px-6 py-3 text-gray-900">{post.title}</td>
                                <td className="px-6 py-3 text-gray-900">{post.content}</td>
                                <td className="space-x-4 px-6 py-3">
                                    <Link href={`/posts/${post.id}?mode=read`}><button className="text-blue-700">Read</button></Link>
                                    <Link href={`/posts/${post.id}?mode=edit`}><button className="text-blue-700">Edit</button></Link>
                                    <button className="text-blue-700" onClick={() => handleDelete(post.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}