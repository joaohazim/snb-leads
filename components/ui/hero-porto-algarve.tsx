import { MoveRight, Bitcoin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ImageGallery } from "@/components/ui/image-gallery";
import { portoAlgarveImages, getImageSrcs } from "@/lib/property-images";
import { useGallery } from "@/hooks/use-gallery";

interface HeroPortoAlgarveProps {
  onContactClick: () => void;
}

function HeroPortoAlgarve({ onContactClick }: HeroPortoAlgarveProps) {
  const imageSrcs = getImageSrcs(portoAlgarveImages);
  const { isOpen, currentIndex, openGallery, closeGallery, navigate } = useGallery(imageSrcs);

  return (
    <>
      <ImageGallery
        images={imageSrcs}
        isOpen={isOpen}
        currentIndex={currentIndex}
        onClose={closeGallery}
        onNavigate={navigate}
      />
    <div className="w-full py-8 lg:py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
          <div className="flex gap-6 flex-col">
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-blue-50 border-blue-200">Lançamento Exclusivo</Badge>
              <Badge className="bg-green-600">Aceita Bitcoin e stablecoins</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-4xl md:text-6xl max-w-lg tracking-tighter text-left font-bold text-slate-900">
                Porto Algarve - Studios Premium Beira-Mar
              </h1>
              <p className="text-lg leading-relaxed tracking-tight text-slate-600 max-w-md text-left">
                Studios a partir de 25m² em localização privilegiada, pé na areia ao lado do Centro de Porto de Galinhas. 
                Oportunidade única com condições especiais de lançamento.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-slate-500 line-through">De R$ 439.000 | $ 80.000 | ₿ 0.70</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-slate-900">R$ 350.000</span>
                  <span className="text-sm text-slate-600">| $ 64.000</span>
                  <span className="text-sm text-slate-600 flex items-center gap-1">
                    | <Bitcoin className="w-4 h-4" /> 0.56
                  </span>
                </div>
                <p className="text-xs text-slate-400 italic">
                  * Preços e cotações podem variar conforme o mercado
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-blue-900">ROI: 32-38%</span>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-green-900">Rental Yield: 15-18%</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Button size="lg" className="gap-2" onClick={onContactClick}>
                Quero Investir <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden shadow-2xl cursor-pointer group">
              <Image 
                src="/images/porto-algarve/insercao.jpg"
                alt="Porto Algarve - Vista do empreendimento"
                width={600}
                height={400}
                className="object-cover w-full aspect-[3/2] transition-transform group-hover:scale-105"
                onClick={() => openGallery(0)}
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-slate-900">Pé na Areia</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-white flex items-center gap-1">
                  <Camera className="w-4 h-4" />
                  {portoAlgarveImages.length} fotos
                </span>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {portoAlgarveImages.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => openGallery(index + 1)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 150px"
                  />
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={() => openGallery(0)}
            >
              <Camera className="w-4 h-4" />
              Ver todas as {portoAlgarveImages.length} fotos
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export { HeroPortoAlgarve };