import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Pet, Category, Order } from '@/types';
import { STORAGE_KEYS } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Package, Users, ShoppingCart, LogOut, Home } from 'lucide-react';

const Admin: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [pets, setPets] = useState<Pet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [petForm, setPetForm] = useState({ name: '', category: '', breed: '', price: '', description: '', image: '', stock: '', status: 'available' as Pet['status'] });

  useEffect(() => {
    if (!user?.isAdmin) { navigate('/'); return; }
    loadData();
  }, [user, navigate]);

  const loadData = () => {
    setPets(JSON.parse(localStorage.getItem(STORAGE_KEYS.PETS) || '[]'));
    setCategories(JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]'));
    setOrders(JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]'));
  };

  const savePet = () => {
    const newPet: Pet = {
      id: editingPet?.id || `pet-${Date.now()}`,
      name: petForm.name, category: petForm.category, breed: petForm.breed,
      price: parseFloat(petForm.price), description: petForm.description,
      image: petForm.image, stock: parseInt(petForm.stock), status: petForm.status,
      createdAt: editingPet?.createdAt || new Date()
    };
    const updated = editingPet ? pets.map(p => p.id === editingPet.id ? newPet : p) : [...pets, newPet];
    localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(updated));
    setPets(updated);
    setIsDialogOpen(false);
    resetForm();
    toast({ title: editingPet ? 'Pet updated!' : 'Pet added!' });
  };

  const deletePet = (id: string) => {
    const updated = pets.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(updated));
    setPets(updated);
    toast({ title: 'Pet deleted!' });
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    setOrders(updated);
    toast({ title: 'Order status updated!' });
  };

  const resetForm = () => {
    setPetForm({ name: '', category: '', breed: '', price: '', description: '', image: '', stock: '', status: 'available' });
    setEditingPet(null);
  };

  const openEditDialog = (pet: Pet) => {
    setEditingPet(pet);
    setPetForm({ name: pet.name, category: pet.category, breed: pet.breed, price: pet.price.toString(), description: pet.description, image: pet.image, stock: pet.stock.toString(), status: pet.status });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-gradient">Admin Panel</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}><Home className="h-4 w-4 mr-2" />Home</Button>
            <Button variant="ghost" size="sm" onClick={logout}><LogOut className="h-4 w-4 mr-2" />Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><Package className="h-8 w-8 text-primary" /><div><p className="text-2xl font-bold">{pets.length}</p><p className="text-muted-foreground text-sm">Total Pets</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><ShoppingCart className="h-8 w-8 text-secondary" /><div><p className="text-2xl font-bold">{orders.length}</p><p className="text-muted-foreground text-sm">Orders</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><Users className="h-8 w-8 text-accent" /><div><p className="text-2xl font-bold">{categories.length}</p><p className="text-muted-foreground text-sm">Categories</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><Package className="h-8 w-8 text-primary" /><div><p className="text-2xl font-bold">${orders.reduce((s, o) => s + o.total, 0).toFixed(0)}</p><p className="text-muted-foreground text-sm">Revenue</p></div></div></CardContent></Card>
        </div>

        <Tabs defaultValue="pets">
          <TabsList className="mb-4"><TabsTrigger value="pets">Pets</TabsTrigger><TabsTrigger value="orders">Orders</TabsTrigger></TabsList>
          
          <TabsContent value="pets">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Pets</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                  <DialogTrigger asChild><Button className="btn-gradient"><Plus className="h-4 w-4 mr-2" />Add Pet</Button></DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader><DialogTitle>{editingPet ? 'Edit' : 'Add'} Pet</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                      <div><Label>Name</Label><Input value={petForm.name} onChange={e => setPetForm({...petForm, name: e.target.value})} /></div>
                      <div><Label>Category</Label><Select value={petForm.category} onValueChange={v => setPetForm({...petForm, category: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{categories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent></Select></div>
                      <div><Label>Breed</Label><Input value={petForm.breed} onChange={e => setPetForm({...petForm, breed: e.target.value})} /></div>
                      <div className="grid grid-cols-2 gap-4"><div><Label>Price</Label><Input type="number" value={petForm.price} onChange={e => setPetForm({...petForm, price: e.target.value})} /></div><div><Label>Stock</Label><Input type="number" value={petForm.stock} onChange={e => setPetForm({...petForm, stock: e.target.value})} /></div></div>
                      <div><Label>Image URL</Label><Input value={petForm.image} onChange={e => setPetForm({...petForm, image: e.target.value})} /></div>
                      <div><Label>Status</Label><Select value={petForm.status} onValueChange={v => setPetForm({...petForm, status: v as Pet['status']})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="available">Available</SelectItem><SelectItem value="out_of_stock">Out of Stock</SelectItem><SelectItem value="unavailable">Unavailable</SelectItem></SelectContent></Select></div>
                      <div><Label>Description</Label><Textarea value={petForm.description} onChange={e => setPetForm({...petForm, description: e.target.value})} /></div>
                      <Button className="w-full btn-gradient" onClick={savePet}>{editingPet ? 'Update' : 'Add'} Pet</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Image</TableHead><TableHead>Name</TableHead><TableHead>Category</TableHead><TableHead>Price</TableHead><TableHead>Stock</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {pets.map(pet => (
                      <TableRow key={pet.id}>
                        <TableCell><img src={pet.image} className="w-12 h-12 object-cover rounded" /></TableCell>
                        <TableCell className="font-medium">{pet.name}</TableCell>
                        <TableCell>{pet.category}</TableCell>
                        <TableCell>${pet.price}</TableCell>
                        <TableCell>{pet.stock}</TableCell>
                        <TableCell><Badge variant={pet.status === 'available' ? 'default' : 'secondary'}>{pet.status}</Badge></TableCell>
                        <TableCell><div className="flex gap-2"><Button size="sm" variant="ghost" onClick={() => openEditDialog(pet)}><Edit className="h-4 w-4" /></Button><Button size="sm" variant="ghost" className="text-destructive" onClick={() => deletePet(pet.id)}><Trash2 className="h-4 w-4" /></Button></div></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader><CardTitle>Manage Orders</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Order ID</TableHead><TableHead>Items</TableHead><TableHead>Total</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {orders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.items.length} items</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell><Badge>{order.status}</Badge></TableCell>
                        <TableCell><Select value={order.status} onValueChange={v => updateOrderStatus(order.id, v as Order['status'])}><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pending">Pending</SelectItem><SelectItem value="processing">Processing</SelectItem><SelectItem value="shipped">Shipped</SelectItem><SelectItem value="delivered">Delivered</SelectItem><SelectItem value="cancelled">Cancelled</SelectItem></SelectContent></Select></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
