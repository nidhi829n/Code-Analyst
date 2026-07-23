function SectionTitle({
    icon,
    title,
}) {

    return (

        <div className="flex items-center gap-3 mb-5">

            <span className="text-2xl">

                {icon}

            </span>

            <h2
                className="
                    text-2xl
                    font-bold
                    text-white
                "
            >

                {title}

            </h2>

        </div>

    );

}

export default SectionTitle;