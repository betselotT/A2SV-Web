import Left from "@/app/components/Left";
import Right from "@/app/components/Right";

const Post = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex">
      <Left params={params} />
      <Right params={params} />
    </div>
  );
};

export default Post;
