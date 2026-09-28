import { SectionIndex } from '../visual/SectionIndex';

type PageHeaderProps = {
  index: string;
  sectionLabel: string;
  titleLight: string;
  titleBold: string;
  subtitle?: string;
};

export function PageHeader({ index, sectionLabel, titleLight, titleBold, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-10 md:mb-14">
      <SectionIndex index={index} label={sectionLabel} />
      <h1 className="editorial-page-title">
        <span className="title-light block font-light">{titleLight}</span>
        <span className="title-bold block font-semibold tracking-tight">{titleBold}</span>
      </h1>
      {subtitle && <p className="text-text-secondary mt-4 max-w-xl text-sm md:text-base">{subtitle}</p>}
    </header>
  );
}
