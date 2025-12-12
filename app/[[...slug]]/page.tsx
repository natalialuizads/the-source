import { getPageImage, source } from '@/lib/source';
import { cn } from '@/lib/utils';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page(props: PageProps<'/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const MDX = page.data.body;

  return (
    <div className={cn("flex flex-col gap-4 text-[#cccccc]")}> 
      <div className={cn(
        "prose prose-invert max-w-none prose-sm text-[#cccccc]" 
      )}>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
