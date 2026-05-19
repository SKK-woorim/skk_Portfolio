import { getPublicContent } from '@/lib/content';
import { HomeExperience } from './home-experience';

export default function HomePage() {
  const content = getPublicContent();

  return <HomeExperience content={content} />;
}
