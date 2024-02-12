export default function Block({ text, description }: { text: String, description: String }) {
    return (
        <div className="flex 
        flex-col 
        items-center 
        justify-center 
        hover:bg-slate-200
        px-4
        py-2
        cursor-pointer
        border-2
        border-slate-200
        rounded-md
        my-2">
            <p className="text-2xl">{text}</p>
            <p className="text-center">{description}</p>
        </div>
    )
}