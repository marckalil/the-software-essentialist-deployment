import { PrismaClient } from "@prisma/client";

import { Post } from "@dddforum/shared/src/api/posts";

import { PostsRepository } from "../ports/postsRepository";
import { ServerErrorException } from "../../../shared/exceptions";

export class ProductionPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaClient) {}

  private formatPost(post: any): Post {
    return {
      id: post.id,
      memberId: post.memberId,
      memberPostedBy: {
        user: post.memberPostedBy.user,
      },
      postType: post.postType,
      title: post.title,
      content: post.content,
      dateCreated: post.dateCreated.toISOString(),
      comments: post.comments || [],
      votes: post.votes || [],
    };
  }

  /**
   * Finds posts sorted by the specified criteria.
   * @param sort - The sorting criteria (not used in this implementation).
   * @returns A promise that resolves to an array of formatted posts.
   */
  async findPosts(_: string): Promise<Post[]> {
    try {
      const posts = await this.prisma.post.findMany({
        orderBy: { dateCreated: "desc" },
        include: {
          memberPostedBy: {
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
          comments: true,
          votes: true,
        },
      });
      const formattedPosts = posts.map(this.formatPost);

      return formattedPosts;
    } catch (error) {
      throw new ServerErrorException();
    }
  }
}
