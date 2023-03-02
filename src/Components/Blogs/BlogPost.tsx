import "./Style/blogPost.css";

interface Props {
  blogList: {
    titleImageUrl: string;
    createdAt: string;
    commentCount: number;
    likeCount: number;
  }[];
}

export default function BlogPost(props: Props) {
  return (
    <ul>
      <li></li>
    </ul>
  );
}
