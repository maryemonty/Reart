import { useEffect, useState } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import CardsFiltered from "./CardsFiltered";
import { BiArrowBack } from "react-icons/bi";

function Categories() {
  const categories = [
    "AI_ART",
    "TWOD_DIGITAL_PAINTING",
    "THREED_DIGITAL_PAINTING",
    "GENERATIVE_ART",
    "PIXEL_ART",
    "FRACTAL_ART",
    "ALGORITHMIC_ART",
    "DIGITAL_PHOTOGRAPHY",
    "VR_PAINTING",
    "TWOD_COMPUTER_GRAPHICS",
    "THREED_COMPUTER_GRAPHICS",
    "PHOTOBASHING",
    "PHOTO_PAINTING",
    "DATA_MOSHING",
    "DYNAMIC_PAINTING",
    "DIGITAL_COLLAGE",
    "RASTER_PAINTING",
    "VECTOR_ART",
    "INTEGRATED_ART",
    "MIXED_MEDIA",
    "COMPUTER_GENERATED_DIGITAL_PAINTING",
  ];

  const aiArt = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHestphNcSbWHVNN1oPJVOy_aCRh269rcxtw&usqp=CAU";
  const twoDdigitalPainting = "https://i.pinimg.com/originals/ed/b3/7f/edb37fb3ce78a82544e9a00d5ab9ed53.jpg";
  const threeDdigitalPainting = "https://i.pinimg.com/736x/94/f0/ea/94f0eab9ca2affa0f444804392f40e31.jpg";
  const generativeArt =
    "https://images.squarespace-cdn.com/content/v1/5c77350965a707ed1710a1bc/1614640208504-9BC8FT2Q7IRVX51WK02G/Manolo.jpg";
  const pixelArt = "https://i.pinimg.com/originals/73/7f/dd/737fdd0886221e59fe3561df429b67be.png";
  const fractalArt = "https://numeralpaint.com/wp-content/uploads/2022/05/aesthetic-Fractal-paint-by-number.jpg";
  const algorithmicArt = "https://images.saatchiart.com/saatchi/698481/art/9688163/8751263-XJMCIXNP-6.jpg";
  const digitalPhotography = "https://www.artupon.com/wp-content/uploads/Alex-Contreras-artupon7-534x462.jpg";
  const vrPainting = "https://vrlowdown.com/wp-content/uploads/2022/06/vr-painting-apps-openbrush.jpg";
  const twoDcomputerGraphics =
    "https://animationworkshop.via.dk/-/media/taw-v2/programmes-and-courses/bachelor-programmes/images/computer-graphic-arts/fayburrow-960x480-v2.jpg";
  const threeDcomputerGraphics = "https://i.pinimg.com/736x/44/e7/9a/44e79a4fc1ae11b021629dcdfc68503d.jpg";
  const photobashing = "https://i.pinimg.com/originals/81/56/f3/8156f387035cb98609723c7918cad438.jpg";
  const photoPainting = "https://papik.pro/en/uploads/posts/2022-10/1666781353_4-papik-pro-p-aesthetic-paintings-4.jpg";
  const dataMoshing = "https://i.pinimg.com/originals/53/b9/d9/53b9d97148776254d77a302ca166e636.jpg";
  const dynamicPainting =
    "https://cdnb.artstation.com/p/assets/images/images/036/062/341/large/west-studio-weststudio-lol-splash-29.jpg?1616620155";
  const digitalCollage =
    "https://cdn.dribbble.com/users/654287/screenshots/15849344/media/2b27ff62291139e2e15bc898697684be.jpg?compress=1&resize=1000x750&vertical=center";
  const rasterPainting = "https://i.pinimg.com/originals/f4/33/d5/f433d5eb7eaa9c9810ef8b82a62d232b.jpg";
  const vectorArt = "https://mir-s3-cdn-cf.behance.net/project_modules/1400/732c1f92535327.5e4d86d0b172f.jpg";
  const integratedArt =
    "https://blogs.glowscotland.org.uk/glowblogs/public/integratedartsreflectivejournal/uploads/sites/5336/2017/09/background-1909992_960_720-e1506341239700.jpg";
  const mixedMedia = "https://i.etsystatic.com/6918590/r/il/571b4b/1569811557/il_fullxfull.1569811557_sqft.jpg";
  const computerGeneratedDigitalPainting =
    "https://www.artmajeur.com/medias/standard/m/u/murat-akal/artwork/16733401_murat-a-anime-girl-face-long-blonde-hair-d283a75f-0070-4afc-a1df-ad2da2e5f2aa.jpg";

  const images = [
    aiArt,
    twoDdigitalPainting,
    threeDdigitalPainting,
    generativeArt,
    pixelArt,
    fractalArt,
    algorithmicArt,
    digitalPhotography,
    vrPainting,
    twoDcomputerGraphics,
    threeDcomputerGraphics,
    photobashing,
    photoPainting,
    dataMoshing,
    dynamicPainting,
    digitalCollage,
    rasterPainting,
    vectorArt,
    integratedArt,
    mixedMedia,
    computerGeneratedDigitalPainting,
  ];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/artworks")
      .then((response) => response.json())
      .then((data) => {
        setArtworks(data);
      });
  }, []);

  const handleCardClick = (category) => {
    setSelectedCategory(category);
  };

  const isCategoryEmpty = artworks.filter((artwork) => artwork.category === selectedCategory).length === 0;

  const handleBackClick = () => {
    setSelectedCategory("");
  };

  return (
    <div className="d-flex flex-wrap vh-100 gap-3 p-2" style={{ overflowY: "scroll" }}>
      {selectedCategory === "" ? (
        images.map((imageUrl, index) => (
          <Card className="text-bg-dark zoom" key={index} onClick={() => handleCardClick(categories[index])}>
            <CardImg
              top
              src={imageUrl}
              alt={categories[index]}
              style={{ height: "300px", width: "300px", objectFit: "cover" }}
            />
            <CardImgOverlay>
              <CardTitle tag="h5" className="fw-bold text-white" style={{ backdropFilter: "blur(50px)" }}>
                {categories[index].replace(/_/g, " ").replace(/TWO/g, "2").replace(/THREE/g, "3")}
              </CardTitle>
            </CardImgOverlay>
          </Card>
        ))
      ) : (
        <div className="d-flex gap-1">
          <BiArrowBack onClick={handleBackClick} className="fs-1 zoom mb-4 fw-bold" />
          {isCategoryEmpty ? (
            <p className="fs-3 fw-bold mt-4 p-3 opacity-25">
              Nothing here, be the first to submit <br></br>artworks in this category!
            </p>
          ) : (
            <CardsFiltered selectedCategory={selectedCategory} artworks={artworks} />
          )}
        </div>
      )}
    </div>
  );
}

export default Categories;
