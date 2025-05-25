import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MarkdownRenderer = ({ markdownText }) => {
  if (typeof markdownText !== "string" || markdownText.trim() === "") {
    return (
      <p className="text-sm italic text-muted-foreground">
        No hay contenido para mostrar.
      </p>
    );
  }

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none p-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
    </div>
  );
};
