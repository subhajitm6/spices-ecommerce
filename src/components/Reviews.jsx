import { Star } from "lucide-react"

export default function Reviews({ rating, reviewCount }) {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      date: "October 12, 2023",
      rating: 5,
      comment: "Absolutely incredible! The aroma hit me as soon as I opened the packet. You can really tell the difference between this and store-bought spices. Will definitely order again.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      date: "September 28, 2023",
      rating: 5,
      comment: "Authentic taste that reminds me of home. The color it adds to my curries is just beautiful without being overly spicy. Highly recommended.",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Emily Chen",
      date: "August 15, 2023",
      rating: 4,
      comment: "Great quality spice. The packaging is premium and keeps it very fresh. Docking one star because delivery took a day longer than expected, but the product itself is flawless.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
    }
  ]

  return (
    <div className="mt-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  className={i < Math.floor(rating) ? "fill-primary text-primary" : "text-border fill-border"} 
                />
              ))}
            </div>
            <span className="font-bold text-foreground">{rating} out of 5</span>
            <span className="text-muted-foreground">Based on {reviewCount} reviews</span>
          </div>
        </div>
        <button className="bg-foreground text-background font-bold py-3 px-8 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg">
          Write a Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-surface/30 p-8 rounded-3xl border border-border/50 hover:border-border transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-foreground">{review.name}</h4>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < review.rating ? "fill-primary text-primary" : "text-border"} 
                />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              "{review.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
