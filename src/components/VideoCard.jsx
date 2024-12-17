
export default function VideoCard({ video }) {

    return (
        <>
            <iframe className="m-1" width="383.4" height="216" key={video.sno} src={video.videoLink}
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        </>)
}