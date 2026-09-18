# MtG proxying: workflow and cost per card

How I print Magic proxies at home.

## The stack

135 gsm glossy photo paper, laminated, cut on a vinyl cutter. Finished card is ~0.32 mm (±0.05mm, vs real MtG cards at 0.305 mm).

## Workflow

The code is at [github.com/j0nas/mtg-proxy](https://github.com/j0nas/mtg-proxy).

1. I start with a Moxfield or Archidekt deck with the quantities and printings picked. `make-proxies <url>`
   pulls it, fetches the card images from Scryfall, and generates a PDF and cut files of of 8[^layout] cards per A4[^a4].
2. I print the PDF on my Epson ET-8550:

   ![The ET-8550 driver's Main tab with the 4x2 Glossy preset selected](/img/docs/mtg-proxying/et-8550-4x2-glossy.png)

   Additionally, _Bidirectional printing_ set to **off** and _Emphasize Text_ set to **Emphasize** under _More Options_.

3. I let the printed sheets dry for a while[^dry], then laminate[^heat] using 80 micron glossy[^glossy] laminate pouches.
4. .. and finally, cut out the cards on a Silhouette Cameo 5 Alpha.
5. If the edges look rough, I run the cards a second time through the laminator. This used to be more of an issue with matte laminating pouches, but doesn't seem to be necessary when using glossy pouches.

## Backs

We all play with sleeves, so I typically don't waste ink printing card backs unless specifically requested, or the deck has double-faced cards. In those cases, I use
[double-sided glossy photo paper](https://www.aliexpress.com/item/4000228649463.html)
instead with manual duplex, but the rest of the process pretty much stays the same.

## Holo foils

I can do foils too. I print on
[A4 holographic sticker paper](https://www.aliexpress.com/item/1005007298255984.html) with
the ET-8550's thick-paper setting. Then I peel off every card one by one and stick it over a bulk common, so the resulting card gets the snap and thickness of a real card. I have to spend some time aligning each sticker to perfectly match the card before I commit to sticking it on. If I do everything correctly, the foils look surprisingly good, but the time and effort involved means I usually don't bother.

## Consumables

Norwegian prices, September 2026, incl. VAT. Ink costs are rough estimates based on Epson's stated numbers.

|                                                                                                                                                                       | Standard     | Double-sided | Holo foil               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------ | ----------------------- |
| [MediaRange A4 glossy photo paper, 135 gsm](https://dvdink.no/fotopapir-blekkpatroner/fotopapir/kopi-mediarange-a4-fotopapir-glanset-135gr-100-ark), 69 kr / 100      | 0.09 kr      |              |                         |
| [Double-sided glossy photo paper, 140 gsm](https://www.aliexpress.com/item/4000228649463.html), ~135 kr / 50                                                          |              | 0.34 kr      |                         |
| [Holographic sticker paper](https://www.aliexpress.com/item/1005007298255984.html), ~520 kr / 100                                                                     |              |              | 0.65 kr                 |
| [Peach thin A4 laminating pouches, 80 µm](https://www.kjell.com/no/produkter/kontor/laminering/peach-tynne-lamineringslommer-a4-100-pakk-p19995)[^apex], 290 kr / 100 | 0.36 kr      | 0.36 kr      |                         |
| Epson 114 ink, original, 6 x 70 ml at ~200 kr each, ~1 200 kr / set                                                                                                   | ~0.27 kr     | ~0.55 kr     | ~0.27 kr                |
| A bulk common to stick the foil on                                                                                                                                    |              |              | whatever you paid       |
| [66x91 mm perfect-fit inner sleeves, black](https://www.aliexpress.com/item/1005006897863485.html), ~250 kr / 500                                                     | 0.50 kr      | 0.50 kr      | 0.50 kr                 |
| **Per card, unsleeved**                                                                                                                                               | **~0.72 kr** | **~1.25 kr** | **~0.92 kr + a common** |
| **Per card, sleeved**                                                                                                                                                 | **~1.22 kr** | **~1.75 kr** | **~1.42 kr + a common** |
| **Per 100-card deck, unsleeved**                                                                                                                                      | **~70 kr**   | **~125 kr**  | **~90 kr + commons**    |
| **Per 100-card deck, sleeved**                                                                                                                                        | **~120 kr**  | **~175 kr**  | **~140 kr + commons**   |

## One-off equipment

| Item      | Model                                                                                                                                                              | Price    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| Printer   | [Epson EcoTank ET-8550](https://www.komplett.no/product/1183799/datautstyr/skrivereskannere/skrivere/epson-ecotank-et-8550-blekkskriver) (A3+, 6-colour photo ink) | 8 990 kr |
| Cutter    | [Silhouette Cameo 5 Alpha](https://www.3djake.no/silhouette/cameo5a) with AutoBlade and the standard 12x12" mat                                                    | 3 670 kr |
| Laminator | GBC Fusion 3100L, used, off Finn. Any A4 pouch laminator would probably do; not sure this one was worth it                                                         | 800 kr   |

[^layout]:
    I tried 3x3 on A4 instead of 4x2. Technically possible, but the registration marks
    end up too close to the cards and the optical scan of the Cameo 5 Alpha kept getting
    confused. Not worth it; might try again some day.

[^a4]:
    Most (all?) of this stack supports A3, but A3 stock is a lot more expensive, so it's not
    worth it vs A4.

[^dry]:
    I haven't tested whether letting the prints dry before laminating makes a noticeable
    difference.

[^heat]:
    Cloudy lamination is too cold; run the pouches one grade above their rating. Wavy
    cards are too hot.

[^glossy]:
    I used to run [matte pouches](https://www.tonerweb.no/pv.php?pid=118104) because I
    was chasing realism, but this made my proxies look more muted and dull. In sleeves, glossy
    laminate looks a lot better: more legible and far more vivid.

[^apex]:
    I tried
    [Apex 75 µm pouches](https://www.kjell.com/no/produkter/kontor/laminering/lamineringslommer-a4-100-pk.-75-mikron-p15231)
    at half the price. More flimsy, and the card comes out the wrong thickness. Pairing them
    with [160 gsm paper](https://dvdink.no/fotopapir-blekkpatroner/fotopapir/mediarange-a4-fotopapir-glanset-160gr-100-ark)
    should land at ~0.34 mm, about the same as now but with the stiffness in the paper rather
    than the film, and ~0.13 kr cheaper per card. Haven't tried it yet, but I should.
