import { ReactNode } from 'react';

/**
 * Shared rich text tag renderers for next-intl t.rich()
 */
export const richTags = {
  highlight: (chunks: ReactNode) => (
    <span className="highlight">{chunks}</span>
  ),
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
  br: () => <br />,
};
