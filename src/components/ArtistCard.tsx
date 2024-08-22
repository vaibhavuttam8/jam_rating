import React from 'react';

interface ArtistCardProps {
  artist: {
    id: string;
    name: string;
    images: { url: string }[];
  };
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <div key={artist.id}>
      {artist.images.length ? (
        <img width={"50%"} src={artist.images[0].url} alt={artist.name} />
      ) : (
        <div>No Image</div>
      )}
      <p>{artist.name}</p>
    </div>
  );
};

export default ArtistCard;
