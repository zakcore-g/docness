import { FC } from 'react';

interface BreadcrumbProps {
  pathname: string;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ pathname }) => {
  const paths = pathname.split('/').filter(Boolean);
  
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2">
        {paths.map((path, index) => (
          <li key={path} className="capitalize">
            {index < paths.length - 1 ? `${path} /` : path}
          </li>
        ))}
      </ol>
    </nav>
  );
};
