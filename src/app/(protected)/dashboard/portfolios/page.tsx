"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

import { Button } from "~/components/ui/button";
import { PlusIcon, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

const portfolios: {
  id: number;
  name: string;
  dailyChange: string;
  cashBalance: string;
  totalValue: string;
}[] = [];

for (let i = 0; i < Math.random() * 20 + 10; i++) {
  portfolios.push({
    id: i,
    name: `Portfolio ${i}`,
    dailyChange: `${(Math.random() * 10 - 5).toFixed(2)}%`,
    cashBalance: `$${(Math.random() * 10000).toFixed(2)}`,
    totalValue: `$${(Math.random() * 100000).toFixed(2)}`,
  });
}

export default function Dashboard() {
  /* const [page, setPage] = useState(1);

  const portfolios = api.portfolio.list.useQuery({
    page: 1,
  }); */

  return (
    <main className="flex min-h-screen flex-col items-center py-12">
      <div className="container flex flex-col justify-center gap-8 px-4 py-16">
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Portfolios</h1>
            <p className="text-sm text-muted-foreground">
              View and manage your trading portfolios.
            </p>
          </div>
          <Button variant={"secondary"}>
            <PlusIcon />
            Create Portfolio
          </Button>
        </div>
        <Card>
          <CardHeader />
          <CardContent>
            <Table>
              <TableCaption>
                View and manage your trading portfolios.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Daily % Change</TableHead>
                  <TableHead>Cash Balance</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolios.map((portfolio) => (
                  <TableRow key={portfolio.id}>
                    <TableCell className="font-medium">
                      {portfolio.name}
                    </TableCell>
                    <TableCell>{portfolio.dailyChange}</TableCell>
                    <TableCell>{portfolio.cashBalance}</TableCell>
                    <TableCell>{portfolio.totalValue}</TableCell>

                    <TableCell className="text-right">
                      <Button variant={"ghost"} size={"sm"}>
                        <Settings />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
