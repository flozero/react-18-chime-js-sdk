interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: string;
    title: string;
    description: any;
    smallText?: string;
}

export const Card = ({
    header,
    title,
    description,
    smallText,
}: CardProps) => (
    <div>
        {header && <div className="text-2xl">{header}</div>}
        <div className="mb-4">
            <div className="text-xl mt-4">{title}</div>
            <div className="mx-4">{description}</div>
            {smallText && <div className="text-black">{smallText}</div>}
        </div>
    </div>
);

