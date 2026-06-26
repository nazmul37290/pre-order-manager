import { prisma } from "@/lib/prisma"

async function main() {
    await prisma.preOrder.createMany({
        data: [
            {
                name: "Summer Sale Drop",
                products: 12,
                preOrderWhen: "regardless-of-stock",
                startsAt: "2026-07-01T10:00:00.000Z",
                endsAt: "2026-07-10T23:59:00.000Z",
                status: "active"
            },
            {
                name: "Winter Collection",
                products: 8,
                preOrderWhen: "out-of-stock",
                startsAt: "2026-11-01T09:00:00.000Z",
                endsAt: null,
                status: "inactive"
            },
            {
                name: "Flash Gadget Sale",
                products: 20,
                preOrderWhen: "regardless-of-stock",
                startsAt: "2026-06-30T12:00:00.000Z",
                endsAt: "2026-07-02T12:00:00.000Z",
                status: "active"
            },
            {
                name: "Back to School",
                products: 15,
                preOrderWhen: "out-of-stock",
                startsAt: "2026-08-01T08:00:00.000Z",
                endsAt: "2026-08-20T23:00:00.000Z",
                status: "active"
            },
            {
                name: "Electronics Mega Drop",
                products: 25,
                preOrderWhen: "regardless-of-stock",
                startsAt: "2026-09-05T10:30:00.000Z",
                endsAt: null,
                status: "inactive"
            },
            {
                name: "Limited Sneaker Launch",
                products: 5,
                preOrderWhen: "out-of-stock",
                startsAt: "2026-07-15T14:00:00.000Z",
                endsAt: "2026-07-16T14:00:00.000Z",
                status: "active"
            },
            {
                name: "Festive Deals",
                products: 18,
                preOrderWhen: "regardless-of-stock",
                startsAt: "2026-10-20T00:00:00.000Z",
                endsAt: "2026-10-31T23:59:00.000Z",
                status: "active"
            },
            {
                name: "Black Friday Preview",
                products: 30,
                preOrderWhen: "out-of-stock",
                startsAt: "2026-11-20T06:00:00.000Z",
                endsAt: "2026-11-25T23:59:00.000Z",
                status: "inactive"
            },
            {
                name: "Cyber Week Deals",
                products: 22,
                preOrderWhen: "regardless-of-stock",
                startsAt: "2026-11-26T00:00:00.000Z",
                endsAt: "2026-12-02T23:59:00.000Z",
                status: "active"
            },
            {
                name: "New Year Specials",
                products: 10,
                preOrderWhen: "out-of-stock",
                startsAt: "2026-12-28T10:00:00.000Z",
                endsAt: "2027-01-05T23:59:00.000Z",
                status: "active"
            },
            {
                name: "Clearance Stock",
                products: 40,
                preOrderWhen: "regardless-of-stock",
                startsAt: "2026-07-05T09:00:00.000Z",
                endsAt: null,
                status: "inactive"
            },
            {
                name: "Gaming Gear Drop",
                products: 14,
                preOrderWhen: "out-of-stock",
                startsAt: "2026-08-15T11:00:00.000Z",
                endsAt: "2026-08-18T23:00:00.000Z",
                status: "active"
            },
            {
                name: "Home Essentials",
                products: 9,
                preOrderWhen: "regardless-of-stock",
                startsAt: "2026-07-10T08:30:00.000Z",
                endsAt: null,
                status: "inactive"
            },
            {
                name: "Mobile Launch Event",
                products: 6,
                preOrderWhen: "out-of-stock",
                startsAt: "2026-09-01T13:00:00.000Z",
                endsAt: "2026-09-03T18:00:00.000Z",
                status: "active"
            },
            {
                name: "Fashion Week Specials",
                products: 16,
                preOrderWhen: "regardless-of-stock",
                startsAt: "2026-10-01T10:00:00.000Z",
                endsAt: "2026-10-07T22:00:00.000Z",
                status: "active"
            }
        ]
    })

}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })