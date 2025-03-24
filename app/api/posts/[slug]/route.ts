import { Post } from "@/app/backend/model/post";
import { NextRequest, NextResponse } from "next/server";
import * as postRepository from "@/app/backend/repository/post.repository";
import { PostUpdateDto } from "@/app/backend/dtos/post-update.dto";

export async function GET(req: NextRequest, { params }: { params : { slug: string }}) {
    try {
        const { slug } = await params;
        const post: Post = await postRepository.obterPorSlug(slug);

        if(!post) {
            return NextResponse.json({error: "Post não encontrado"}, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({message: "Falha ao buscar post", error: error}, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params : { slug: string }}) {
    try {
        const { slug } = await params;
        const post: Post = await postRepository.obterPorSlug(slug);

        if (!post) {
            return NextResponse.json({ error: "Post não encontrado" }, { status: 404});
        }

        const updatePost: PostUpdateDto = await req.json();
        const updatedPost: Post = await postRepository.update(slug, updatePost);

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        return NextResponse.json({message: "Falha ao atualizar post", error: error}, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params : { slug: string }}) {
    try {
        const { slug } = await params;

        const post: Post = await postRepository.obterPorSlug(slug);

        if (!post) {
            return NextResponse.json({ error: "Post não encontrado" }, { status: 404});
        }


        await postRepository.excluir(slug);
        return NextResponse.json({message: "Post excluido com sucesso"}, { status: 200 })
    } catch (error) {
        return NextResponse.json({message: "Falha ao excluir post", error: error}, { status: 500 })

    }
}