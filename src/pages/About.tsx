import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Heart,
  Shield,
  Award,
  Users,
  Target,
  Eye,
  Sparkles,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Star,
  Quote
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About: React.FC = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Families", color: "text-primary" },
    { icon: Heart, value: "15,000+", label: "Pets Adopted", color: "text-red-500" },
    { icon: Award, value: "98%", label: "Satisfaction Rate", color: "text-yellow-500" },
    { icon: Calendar, value: "12+", label: "Years Experience", color: "text-green-500" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We treat every pet with love and care, ensuring they find the perfect home where they'll be cherished.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "All our pets undergo thorough health checks and come with comprehensive health guarantees.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in pet care, breeding, and customer service.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive community of pet lovers who share knowledge and experiences.",
      color: "from-green-500 to-emerald-500"
    },
  ];

  const timeline = [
    {
      year: "2012",
      title: "Our Beginning",
      description: "PetPals was founded with a simple mission: to connect loving families with their perfect pet companions.",
    },
    {
      year: "2015",
      title: "Expanding Reach",
      description: "We expanded our services nationwide, helping thousands of families find their furry friends.",
    },
    {
      year: "2018",
      title: "Health Guarantee Program",
      description: "Introduced our comprehensive 30-day health guarantee, ensuring peace of mind for all adoptions.",
    },
    {
      year: "2021",
      title: "Online Platform Launch",
      description: "Launched our digital platform, making it easier than ever to browse and adopt pets from home.",
    },
    {
      year: "2024",
      title: "10,000+ Happy Families",
      description: "Celebrated a major milestone: over 10,000 successful adoptions and countless happy memories created.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Passionate about animal welfare with 15+ years of experience.",
    },
    {
      name: "Michael Chen",
      role: "Veterinary Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Licensed veterinarian ensuring all pets are healthy and happy.",
    },
    {
      name: "Emily Rodriguez",
      role: "Adoption Specialist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Helping families find their perfect match for over 8 years.",
    },
    {
      name: "David Thompson",
      role: "Customer Care Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Dedicated to providing exceptional support throughout your journey.",
    },
  ];

  const testimonials = [
    {
      name: "Jennifer Martinez",
      role: "Dog Owner",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      content: "PetPals made our adoption process seamless. Our golden retriever Max has brought so much joy to our family!",
      rating: 5,
    },
    {
      name: "Robert Kim",
      role: "Cat Owner",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      content: "The team was incredibly helpful and patient. Our cat Luna is the perfect addition to our home. Highly recommend!",
      rating: 5,
    },
    {
      name: "Amanda Wilson",
      role: "Bird Owner",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      content: "Professional service from start to finish. Our parrot Charlie is healthy, happy, and well-socialized. Thank you!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10 py-20">
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="inline-block text-7xl mb-6 animate-float">🐾</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            About <span className="text-gradient">PetPals</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Connecting loving families with their perfect pet companions since 2012.
            We're passionate about creating happy homes and lasting bonds.
          </p>
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <Link to="/pets">
              <Button className="btn-gradient h-12 px-8 text-lg">
                Explore Our Pets
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Breadcrumbs */}
      <nav className="bg-muted/50 py-3 px-4 border-b">
        <div className="container mx-auto flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">About</span>
        </div>
      </nav>

      {/* Statistics Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Impact</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Numbers that reflect our commitment to creating happy pet families
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="text-center card-hover border-2 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <CardContent className="pt-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 ${stat.color}`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-4xl font-bold mb-2 text-gradient">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                To connect loving families with healthy, happy pets while promoting responsible pet ownership
                and animal welfare. We believe every pet deserves a loving home, and every family deserves
                the perfect companion.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through our comprehensive care, health guarantees, and ongoing support, we ensure that
                every adoption is a success story waiting to happen.
              </p>
            </div>
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Eye className="h-8 w-8 text-accent" />
                </div>
                <h2 className="font-serif text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                To become the most trusted and beloved pet adoption platform, recognized for our
                commitment to animal welfare, customer satisfaction, and community building.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We envision a world where every pet finds a loving home, and every pet owner has
                access to the resources and support they need for a lifetime of happiness together.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="card-hover border-2 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <CardContent className="pt-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${value.color} mb-4`}>
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Milestones that shaped who we are today
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className="relative mb-12 animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {item.year.slice(-2)}
                      </div>
                      <div className="absolute left-8 top-16 w-0.5 h-12 bg-primary/20 hidden md:block" />
                    </div>
                    <Card className="flex-1 card-hover border-2">
                      <CardContent className="pt-6">
                        <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                        <h3 className="font-serif text-2xl font-bold mb-3">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The passionate people behind PetPals
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={member.name}
                className="card-hover border-2 overflow-hidden animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-serif text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real stories from happy pet families
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className="card-hover border-2 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground text-lg">
                We'd love to hear from you. Reach out to us anytime!
              </p>
            </div>
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center md:text-left">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p className="text-muted-foreground text-sm">
                      Pet Street, Karumathampatti<br />
                      Coimbatore, Tamil Nadu
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <p className="text-muted-foreground text-sm">
                      +91 63821 61975<br />
                      Mon-Sat: 9AM - 8PM
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground text-sm">
                      yogeshlogesh77@gmail.com<br />
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 pt-6 border-t">
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Perfect Companion?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of happy families who found their best friend through PetPals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pets">
                <Button className="btn-gradient h-12 px-8 text-lg">
                  Browse All Pets
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" className="h-12 px-8 text-lg">
                  View Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
