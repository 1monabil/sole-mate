import { StaticPageLayout } from '@/components/StaticPageLayout';
import { Ruler, Footprints, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mensSizes = [
  { us: '7', uk: '6', eu: '40', cm: '25' },
  { us: '7.5', uk: '6.5', eu: '40.5', cm: '25.5' },
  { us: '8', uk: '7', eu: '41', cm: '26' },
  { us: '8.5', uk: '7.5', eu: '42', cm: '26.5' },
  { us: '9', uk: '8', eu: '42.5', cm: '27' },
  { us: '9.5', uk: '8.5', eu: '43', cm: '27.5' },
  { us: '10', uk: '9', eu: '44', cm: '28' },
  { us: '10.5', uk: '9.5', eu: '44.5', cm: '28.5' },
  { us: '11', uk: '10', eu: '45', cm: '29' },
  { us: '11.5', uk: '10.5', eu: '45.5', cm: '29.5' },
  { us: '12', uk: '11', eu: '46', cm: '30' },
  { us: '13', uk: '12', eu: '47.5', cm: '31' },
];

const womensSizes = [
  { us: '5', uk: '2.5', eu: '35.5', cm: '22' },
  { us: '5.5', uk: '3', eu: '36', cm: '22.5' },
  { us: '6', uk: '3.5', eu: '36.5', cm: '23' },
  { us: '6.5', uk: '4', eu: '37.5', cm: '23.5' },
  { us: '7', uk: '4.5', eu: '38', cm: '24' },
  { us: '7.5', uk: '5', eu: '38.5', cm: '24.5' },
  { us: '8', uk: '5.5', eu: '39', cm: '25' },
  { us: '8.5', uk: '6', eu: '40', cm: '25.5' },
  { us: '9', uk: '6.5', eu: '40.5', cm: '26' },
  { us: '9.5', uk: '7', eu: '41', cm: '26.5' },
  { us: '10', uk: '7.5', eu: '42', cm: '27' },
  { us: '11', uk: '8.5', eu: '43', cm: '28' },
];

const SizeGuide = () => {
  return (
    <StaticPageLayout title="Size Guide">
      <div className="max-w-4xl">
        <p className="text-muted-foreground text-lg mb-12">
          Find your perfect fit with our comprehensive size guide. 
          Use the charts below to convert between different sizing systems.
        </p>

        {/* How to Measure */}
        <section className="bg-card rounded-2xl p-8 border border-border mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">How to Measure Your Feet</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <p className="text-muted-foreground">
                  Place a piece of paper against a wall and stand on it with your heel against the wall.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <p className="text-muted-foreground">
                  Mark the longest point of your foot on the paper with a pencil.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <p className="text-muted-foreground">
                  Measure the distance from the wall to the mark in centimeters.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  4
                </div>
                <p className="text-muted-foreground">
                  Use the measurement to find your size in the chart below.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                <Footprints className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>
        </section>

        {/* Men's Size Chart */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Men's Size Chart</h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">US</TableHead>
                  <TableHead className="font-bold">UK</TableHead>
                  <TableHead className="font-bold">EU</TableHead>
                  <TableHead className="font-bold">CM</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mensSizes.map((size) => (
                  <TableRow key={size.us}>
                    <TableCell>{size.us}</TableCell>
                    <TableCell>{size.uk}</TableCell>
                    <TableCell>{size.eu}</TableCell>
                    <TableCell>{size.cm}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Women's Size Chart */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Women's Size Chart</h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">US</TableHead>
                  <TableHead className="font-bold">UK</TableHead>
                  <TableHead className="font-bold">EU</TableHead>
                  <TableHead className="font-bold">CM</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {womensSizes.map((size) => (
                  <TableRow key={size.us}>
                    <TableCell>{size.us}</TableCell>
                    <TableCell>{size.uk}</TableCell>
                    <TableCell>{size.eu}</TableCell>
                    <TableCell>{size.cm}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Fitting Tips */}
        <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">Fitting Tips</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Measure your feet at the end of the day when they're largest</li>
                <li>• If you're between sizes, we recommend sizing up</li>
                <li>• Consider the width of your foot – some styles run narrow</li>
                <li>• Check individual product pages for style-specific fit notes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default SizeGuide;
