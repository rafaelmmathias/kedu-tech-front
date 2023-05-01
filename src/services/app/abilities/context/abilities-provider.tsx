import { AuthResponse, useAuth } from "@/modules/auth";

import { AbilityBuilder, createMongoAbility, PureAbility } from "@casl/ability";
import { createContextualCan } from "@casl/react";
import { createContext, useContext, useEffect, useState } from "react";
import { appPermissionsByApiRole } from "../constants";
import type { AppAbility, Conditions, PossibleAbilities } from "../entities";

function defineAbilityFor(auth?: AuthResponse): AppAbility {
  const builder = new AbilityBuilder(
    createMongoAbility<PossibleAbilities, Conditions>,
  );

  auth &&
    auth.roles &&
    auth.roles.forEach((role) => {
      if (typeof appPermissionsByApiRole[role] === "function") {
        appPermissionsByApiRole[role](auth.user, builder);
      } else {
        console.error(`Tried to use unknown role "${role}"`);
      }
    });

  return builder.build();
}

type AbilityContextProps = PureAbility<PossibleAbilities>;
export const AbilityContext = createContext<AbilityContextProps>(
  {} as AbilityContextProps,
);

export const Can = createContextualCan<AbilityContextProps>(
  AbilityContext.Consumer,
);

type AbilitiesProviderProps = {
  children: React.ReactNode;
};

export const AbilitiesProvider: React.FC<AbilitiesProviderProps> = ({
  children,
}) => {
  const { auth } = useAuth();
  const [abilities, setAbilities] = useState<AppAbility>(
    defineAbilityFor(auth),
  );

  useEffect(() => {
    const updatedAbilities = defineAbilityFor(auth);

    setAbilities(updatedAbilities);
  }, [auth]);

  return (
    <AbilityContext.Provider value={abilities}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility: () => PureAbility<PossibleAbilities, unknown> = () => {
  const context = useContext(AbilityContext);
  return context;
};
