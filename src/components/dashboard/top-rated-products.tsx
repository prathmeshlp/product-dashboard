import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { title: string; rating: number }[];
}

const TopRatedProducts = ({ data }: Props) => {
  console.log(data,"toprated");
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" />
        <YAxis dataKey="title" type="category" width={150} />
        <Tooltip />
        <Bar dataKey="rating" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopRatedProducts;
