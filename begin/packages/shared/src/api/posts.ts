import axios from "axios";
import { APIResponse, ServerError } from ".";

export type GetPostsParams = {
  sort: string;
};

export type Post = {
  id: number;
  memberId: number;
  memberPostedBy: {
    user: {
      username: string;
    };
  };
  postType: string;
  title: string;
  content: string;
  dateCreated: string;
  comments: any[];
  votes: any[];
};

export type GetPostErrors = ServerError;

export type GetPostsResponse = APIResponse<Post[], GetPostErrors>;

export type PostsResponse = GetPostsResponse;

export const createPostsAPI = (apiURL: string) => {
  return {
    getPosts: async (sort: string): Promise<PostsResponse> => {
      try {
        const successResponse = await axios.get(`${apiURL}/posts?sort=${sort}`);
        return successResponse.data as GetPostsResponse;
      } catch (err: any) {
        return err.response.data as GetPostsResponse;
      }
    },
  };
};
