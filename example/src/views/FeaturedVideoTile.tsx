import { useFeaturedTileState } from "react-18-amazon-chime-js-sdk";

export const FeaturedVideoTileView = () => {
    const { tileId } = useFeaturedTileState();

    return (
        <div>{tileId ? `Tile ${tileId} is featured` : 'No featured tiles'}</div>
    );
}