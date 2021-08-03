import React from 'react';
import "./CGV.css";
import Container from '@material-ui/core/Container';
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";

export default function CGV() {
    return (
        <div className="cgv">
          <NavBar />
            <h1 className="title"> Conditions générales de vente </h1> <hr></hr> <br></br>

             <Container className="text-CGV" maxWidth="lg">
                    <p> 
                    Les conditions générales de vente (CGV) doivent être communiquées par tout professionnel à un acheteur de produits qui en fait la demande pour une activité professionnelle. Un manquement à une telle obligation est sanctionné. Si aucune demande n'est faite, il n'y a pas d'obligation de communication. Les CGV figurent dans les documents contractuels (bons de commande, devis, contrats notamment) ou publicitaires (écriteaux, affiches apposées sur les lieux de vente par exemple).
                    </p> <br></br>
                      <h4 className="h4">Condition générale de vente BTOC :</h4> <br></br>
                        <p>
                            Les dispositions légales accordent une protection importante aux consommateurs, laquelle a été renforcé par la loi Hamon du 17 mars 2014.
                            Les professionnels voient leurs obligations augmenter notamment en matière d'informations pré contractuelles ou encore d'augmentation du délai de rétractation offert au consommateur (14 jours au lieu de 7 jours pour les ventes à distances par exemple).
                            Depuis la loi Hamon et la création du nouvel article L133-3 du Code de la consommation, les conditions générales de ventes B to C doivent en outre impérativement mentionner l'existence des conditions de mise en œuvre et de contenu de la garantie légale de conformité et de la garantie relative au défaut de la chose vendue, due par le vendeur mais également le cas échéant, l'existence d'une garantie commerciale et d'un service après-vente.
                            Assuré dans ce cadre que les conditions générales de vente seront opposables aux consommateurs et veille également au respect des articles 1369-1 et suivant du Code civil, applicables aux ventes conclues par voie électronique.
                        </p>
                          <p>
                            Les conditions générales de vente entre professionnels (ou B2B) doivent obligatoirement mentionner les informations suivantes :
                            Conditions de règlement, notamment délais de paiement et pénalités de retard et montant des indemnités pour frais de recouvrement
                            Éventuelles réductions de prix et conditions d'escompte
                            Barème des prix unitaires
                            Le prestataire de service doit adresser au destinataire qui en fait la demande un devis suffisamment détaillé. Une méthode de calcul du prix peut aussi être communiquée. Il est obligatoire de communiquer la méthode de calcul lorsque le prix du service ou du type de service ne peut pas être déterminé avec exactitude.

                          </p>

                          <p> Nous ésperons avoir répondu à toutes vos questions, pour de plus amples explication n'hésitez pas à vous informez sur notre WhitePaper.</p>
             </Container>

             <NavBarDetail />
        </div>
    )
}