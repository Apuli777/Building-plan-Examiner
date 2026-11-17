export default function PageHeading({title,subtitle,eyebrow,action}) {
 return <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
  <div>{eyebrow&&<div className="eyebrow mb-2">{eyebrow}</div>}<h1 className="h2 mb-2">{title}</h1>{subtitle&&<p className="text-secondary mb-0">{subtitle}</p>}</div>
  {action&&<div>{action}</div>}
 </div>;
}
