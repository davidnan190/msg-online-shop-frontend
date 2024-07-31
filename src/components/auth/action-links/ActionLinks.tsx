import { Link } from 'react-router-dom';

type Props = {
  firstLinkText: string;
  firstLinkPath: string;
  secondLinkText?: string;
  secondLinkPath?: string;
};

export const ActionLinks: React.FC<Props> = ({
  firstLinkText,
  firstLinkPath,
  secondLinkText,
  secondLinkPath,
}: Props) => (
  <>
    <hr className="divider" />
    <div className="action-links">
      <div className="link-container">
        <Link to={firstLinkPath} className="action-link">
          <small>{firstLinkText}</small>
        </Link>
      </div>
      {secondLinkPath && (
        <div className="link-container">
          <Link to={secondLinkPath} className="action-link">
            <small>{secondLinkText}</small>
          </Link>
        </div>
      )}
    </div>
  </>
);
