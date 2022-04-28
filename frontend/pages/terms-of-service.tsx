import { NextPage, GetStaticProps } from "next";
import { read } from "to-vfile";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";

interface PrivacyPolicyProps {
  mdFile: string;
}

const PrivacyPolicy: NextPage<PrivacyPolicyProps> = ({ mdFile }) => {
  return (
    <div className="flex flex-row justify-center py-8">
      <article
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: mdFile }}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const mdFile = await remark()
    .use(remarkPresetLintMarkdownStyleGuide)
    .use(remarkHtml)
    .process(await read("src/content/termsOfService.md"));

  return {
    props: { mdFile: String(mdFile) },
  };
};

export default PrivacyPolicy;
