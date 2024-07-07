export default function Avatar({ avatarUrl, width }) {
    return (
        <div className={`avatar ${width}`}>
            <div className="w-full rounded-full">
                <img src={avatarUrl} alt="Avatar" />
            </div>
        </div>
    );
}