"use server"
import { PrismaClient } from "@prisma/client";
import { Post } from "../model/post";
import { PostUpdateDto } from "../dtos/post-update.dto";

const db = new PrismaClient();

export async function obterTodos(): Promise<Post[]> {
    return await db.post.findMany();
}

export async function salvar(post: Post): Promise<Post> {
    return await db.post.upsert({
        where: { id: post.id },
        update: post,
        create: post,
    });
}

export async function obterPorSlug(slug: string): Promise<Post> {
    const post = await db.post.findUnique({
        where: { slug },
    });
    return post as Post;
}

export async function update(slug: string, post: PostUpdateDto) {
    return await db.post.update({
        where: {slug: slug},
        data: post,
    })
}

export async function excluir(slug: string): Promise<void> {
    await db.post.delete({
        where: { slug }
    })
}