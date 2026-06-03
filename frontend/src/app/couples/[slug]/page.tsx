import CoupleProfile from "../../../components/couples/CoupleProfile";

interface PageProps {
  params: { slug: string };
}

export default function CoupleProfilePage({ params }: PageProps) {
  const slug = params.slug; // ✅ Extract primitive on server
  return <CoupleProfile slug={slug} />; // ✅ Pass only plain value
}
