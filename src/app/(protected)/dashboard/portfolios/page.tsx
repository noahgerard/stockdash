"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

// TODO: Add pagination functionality

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
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
import { Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import NewPortButton from "~/components/NewPortButton";

export default function Dashboard() {
  const [page, setPage] = useState(1);

  const portfolios = api.portfolio.list.useQuery({
    page: 1,
  });

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
          <NewPortButton />
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
                {portfolios.data?.map((portfolio) => (
                  <TableRow key={portfolio.id}>
                    <TableCell className="font-medium">
                      {portfolio.name}
                    </TableCell>
                    <TableCell>{portfolio.dailyChangeAmount}</TableCell>
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
