"use client";
import ProductsList from "./ProductsList";
import DialogWithFormButton from "../commons/DialogWithFormButton";
import AddProductForm from "./AddProductForm";

const Fridge = () => {
  return (
    <div>
      <div className="pb-2 border-b mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mon frigo</h1>
        <DialogWithFormButton
          name="Ajouter un produit"
          dialog={{
            title: "Ajouter un produit",
            description:
              "Pour ajouter un produit à votre frigo, choisissez l'aliment et la quantité.",
            form: (setShowDialog) => (
              <AddProductForm setShowDialog={setShowDialog} />
            ),
          }}
        />
      </div>
      <ProductsList />
    </div>
  );
};

export default Fridge;
