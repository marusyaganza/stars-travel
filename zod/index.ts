import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','password','name','role','createdAt']);

export const FlightScalarFieldEnumSchema = z.enum(['id','destinationId','originId','date','starshipId','cancelled','creatorId','logo']);

export const StarshipScalarFieldEnumSchema = z.enum(['id','name','model','manufacturer','length','max_atmosphering_speed','crew','passengers','cargo_capacity','hyperdrive_rating','MGLT','starship_class','slug','img']);

export const PlanetScalarFieldEnumSchema = z.enum(['id','name','terrain','climate','slug','img']);

export const ChatConversationScalarFieldEnumSchema = z.enum(['id','userId','character','title','createdAt','updatedAt']);

export const ChatMessageScalarFieldEnumSchema = z.enum(['id','conversationId','content','isUser','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const ROLESchema = z.enum(['USER','ADMIN']);

export type ROLEType = `${z.infer<typeof ROLESchema>}`

export const ChatCharacterSchema = z.enum(['YODA','C3PO']);

export type ChatCharacterType = `${z.infer<typeof ChatCharacterSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: ROLESchema,
  id: z.string().cuid(),
  email: z.string(),
  password: z.string(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// FLIGHT SCHEMA
/////////////////////////////////////////

export const FlightSchema = z.object({
  id: z.string().cuid(),
  destinationId: z.string(),
  originId: z.string(),
  date: z.coerce.date(),
  starshipId: z.string(),
  cancelled: z.boolean(),
  creatorId: z.string(),
  logo: z.string().nullable(),
})

export type Flight = z.infer<typeof FlightSchema>

/////////////////////////////////////////
// STARSHIP SCHEMA
/////////////////////////////////////////

export const StarshipSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  length: z.number(),
  max_atmosphering_speed: z.number(),
  crew: z.number().int(),
  passengers: z.number().int(),
  cargo_capacity: z.number(),
  hyperdrive_rating: z.number(),
  MGLT: z.string(),
  starship_class: z.string(),
  slug: z.string(),
  img: z.string().nullable(),
})

export type Starship = z.infer<typeof StarshipSchema>

/////////////////////////////////////////
// PLANET SCHEMA
/////////////////////////////////////////

export const PlanetSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  terrain: z.string(),
  climate: z.string(),
  slug: z.string(),
  img: z.string().nullable(),
})

export type Planet = z.infer<typeof PlanetSchema>

/////////////////////////////////////////
// CHAT CONVERSATION SCHEMA
/////////////////////////////////////////

export const ChatConversationSchema = z.object({
  character: ChatCharacterSchema,
  id: z.string().cuid(),
  userId: z.string(),
  title: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ChatConversation = z.infer<typeof ChatConversationSchema>

/////////////////////////////////////////
// CHAT MESSAGE SCHEMA
/////////////////////////////////////////

export const ChatMessageSchema = z.object({
  id: z.string().cuid(),
  conversationId: z.string(),
  content: z.string(),
  isUser: z.boolean(),
  createdAt: z.coerce.date(),
})

export type ChatMessage = z.infer<typeof ChatMessageSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  bookings: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  createdFlights: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  chatConversations: z.union([z.boolean(),z.lazy(() => ChatConversationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  bookings: z.boolean().optional(),
  createdFlights: z.boolean().optional(),
  chatConversations: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  name: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  bookings: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  createdFlights: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  chatConversations: z.union([z.boolean(),z.lazy(() => ChatConversationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FLIGHT
//------------------------------------------------------

export const FlightIncludeSchema: z.ZodType<Prisma.FlightInclude> = z.object({
  destination: z.union([z.boolean(),z.lazy(() => PlanetArgsSchema)]).optional(),
  origin: z.union([z.boolean(),z.lazy(() => PlanetArgsSchema)]).optional(),
  starship: z.union([z.boolean(),z.lazy(() => StarshipArgsSchema)]).optional(),
  creator: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  bookedBy: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FlightCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FlightArgsSchema: z.ZodType<Prisma.FlightDefaultArgs> = z.object({
  select: z.lazy(() => FlightSelectSchema).optional(),
  include: z.lazy(() => FlightIncludeSchema).optional(),
}).strict();

export const FlightCountOutputTypeArgsSchema: z.ZodType<Prisma.FlightCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FlightCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FlightCountOutputTypeSelectSchema: z.ZodType<Prisma.FlightCountOutputTypeSelect> = z.object({
  bookedBy: z.boolean().optional(),
}).strict();

export const FlightSelectSchema: z.ZodType<Prisma.FlightSelect> = z.object({
  id: z.boolean().optional(),
  destinationId: z.boolean().optional(),
  originId: z.boolean().optional(),
  date: z.boolean().optional(),
  starshipId: z.boolean().optional(),
  cancelled: z.boolean().optional(),
  creatorId: z.boolean().optional(),
  logo: z.boolean().optional(),
  destination: z.union([z.boolean(),z.lazy(() => PlanetArgsSchema)]).optional(),
  origin: z.union([z.boolean(),z.lazy(() => PlanetArgsSchema)]).optional(),
  starship: z.union([z.boolean(),z.lazy(() => StarshipArgsSchema)]).optional(),
  creator: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  bookedBy: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FlightCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STARSHIP
//------------------------------------------------------

export const StarshipIncludeSchema: z.ZodType<Prisma.StarshipInclude> = z.object({
  flights: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StarshipCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StarshipArgsSchema: z.ZodType<Prisma.StarshipDefaultArgs> = z.object({
  select: z.lazy(() => StarshipSelectSchema).optional(),
  include: z.lazy(() => StarshipIncludeSchema).optional(),
}).strict();

export const StarshipCountOutputTypeArgsSchema: z.ZodType<Prisma.StarshipCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StarshipCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StarshipCountOutputTypeSelectSchema: z.ZodType<Prisma.StarshipCountOutputTypeSelect> = z.object({
  flights: z.boolean().optional(),
}).strict();

export const StarshipSelectSchema: z.ZodType<Prisma.StarshipSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  model: z.boolean().optional(),
  manufacturer: z.boolean().optional(),
  length: z.boolean().optional(),
  max_atmosphering_speed: z.boolean().optional(),
  crew: z.boolean().optional(),
  passengers: z.boolean().optional(),
  cargo_capacity: z.boolean().optional(),
  hyperdrive_rating: z.boolean().optional(),
  MGLT: z.boolean().optional(),
  starship_class: z.boolean().optional(),
  slug: z.boolean().optional(),
  img: z.boolean().optional(),
  flights: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StarshipCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PLANET
//------------------------------------------------------

export const PlanetIncludeSchema: z.ZodType<Prisma.PlanetInclude> = z.object({
  flightsAsDestination: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  flightsAsOrigin: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PlanetCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PlanetArgsSchema: z.ZodType<Prisma.PlanetDefaultArgs> = z.object({
  select: z.lazy(() => PlanetSelectSchema).optional(),
  include: z.lazy(() => PlanetIncludeSchema).optional(),
}).strict();

export const PlanetCountOutputTypeArgsSchema: z.ZodType<Prisma.PlanetCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PlanetCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PlanetCountOutputTypeSelectSchema: z.ZodType<Prisma.PlanetCountOutputTypeSelect> = z.object({
  flightsAsDestination: z.boolean().optional(),
  flightsAsOrigin: z.boolean().optional(),
}).strict();

export const PlanetSelectSchema: z.ZodType<Prisma.PlanetSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  terrain: z.boolean().optional(),
  climate: z.boolean().optional(),
  slug: z.boolean().optional(),
  img: z.boolean().optional(),
  flightsAsDestination: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  flightsAsOrigin: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PlanetCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CHAT CONVERSATION
//------------------------------------------------------

export const ChatConversationIncludeSchema: z.ZodType<Prisma.ChatConversationInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => ChatMessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChatConversationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ChatConversationArgsSchema: z.ZodType<Prisma.ChatConversationDefaultArgs> = z.object({
  select: z.lazy(() => ChatConversationSelectSchema).optional(),
  include: z.lazy(() => ChatConversationIncludeSchema).optional(),
}).strict();

export const ChatConversationCountOutputTypeArgsSchema: z.ZodType<Prisma.ChatConversationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ChatConversationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ChatConversationCountOutputTypeSelectSchema: z.ZodType<Prisma.ChatConversationCountOutputTypeSelect> = z.object({
  messages: z.boolean().optional(),
}).strict();

export const ChatConversationSelectSchema: z.ZodType<Prisma.ChatConversationSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  character: z.boolean().optional(),
  title: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => ChatMessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChatConversationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CHAT MESSAGE
//------------------------------------------------------

export const ChatMessageIncludeSchema: z.ZodType<Prisma.ChatMessageInclude> = z.object({
  conversation: z.union([z.boolean(),z.lazy(() => ChatConversationArgsSchema)]).optional(),
}).strict()

export const ChatMessageArgsSchema: z.ZodType<Prisma.ChatMessageDefaultArgs> = z.object({
  select: z.lazy(() => ChatMessageSelectSchema).optional(),
  include: z.lazy(() => ChatMessageIncludeSchema).optional(),
}).strict();

export const ChatMessageSelectSchema: z.ZodType<Prisma.ChatMessageSelect> = z.object({
  id: z.boolean().optional(),
  conversationId: z.boolean().optional(),
  content: z.boolean().optional(),
  isUser: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  conversation: z.union([z.boolean(),z.lazy(() => ChatConversationArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumROLEFilterSchema),z.lazy(() => ROLESchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bookings: z.lazy(() => FlightListRelationFilterSchema).optional(),
  createdFlights: z.lazy(() => FlightListRelationFilterSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  bookings: z.lazy(() => FlightOrderByRelationAggregateInputSchema).optional(),
  createdFlights: z.lazy(() => FlightOrderByRelationAggregateInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumROLEFilterSchema),z.lazy(() => ROLESchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bookings: z.lazy(() => FlightListRelationFilterSchema).optional(),
  createdFlights: z.lazy(() => FlightListRelationFilterSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumROLEWithAggregatesFilterSchema),z.lazy(() => ROLESchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FlightWhereInputSchema: z.ZodType<Prisma.FlightWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FlightWhereInputSchema),z.lazy(() => FlightWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FlightWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FlightWhereInputSchema),z.lazy(() => FlightWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  destinationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  originId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  starshipId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cancelled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  destination: z.union([ z.lazy(() => PlanetScalarRelationFilterSchema),z.lazy(() => PlanetWhereInputSchema) ]).optional(),
  origin: z.union([ z.lazy(() => PlanetScalarRelationFilterSchema),z.lazy(() => PlanetWhereInputSchema) ]).optional(),
  starship: z.union([ z.lazy(() => StarshipScalarRelationFilterSchema),z.lazy(() => StarshipWhereInputSchema) ]).optional(),
  creator: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  bookedBy: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const FlightOrderByWithRelationInputSchema: z.ZodType<Prisma.FlightOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  destinationId: z.lazy(() => SortOrderSchema).optional(),
  originId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  starshipId: z.lazy(() => SortOrderSchema).optional(),
  cancelled: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  logo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  destination: z.lazy(() => PlanetOrderByWithRelationInputSchema).optional(),
  origin: z.lazy(() => PlanetOrderByWithRelationInputSchema).optional(),
  starship: z.lazy(() => StarshipOrderByWithRelationInputSchema).optional(),
  creator: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  bookedBy: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FlightWhereUniqueInputSchema: z.ZodType<Prisma.FlightWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => FlightWhereInputSchema),z.lazy(() => FlightWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FlightWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FlightWhereInputSchema),z.lazy(() => FlightWhereInputSchema).array() ]).optional(),
  destinationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  originId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  starshipId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cancelled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  destination: z.union([ z.lazy(() => PlanetScalarRelationFilterSchema),z.lazy(() => PlanetWhereInputSchema) ]).optional(),
  origin: z.union([ z.lazy(() => PlanetScalarRelationFilterSchema),z.lazy(() => PlanetWhereInputSchema) ]).optional(),
  starship: z.union([ z.lazy(() => StarshipScalarRelationFilterSchema),z.lazy(() => StarshipWhereInputSchema) ]).optional(),
  creator: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  bookedBy: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict());

export const FlightOrderByWithAggregationInputSchema: z.ZodType<Prisma.FlightOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  destinationId: z.lazy(() => SortOrderSchema).optional(),
  originId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  starshipId: z.lazy(() => SortOrderSchema).optional(),
  cancelled: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  logo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => FlightCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FlightMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FlightMinOrderByAggregateInputSchema).optional()
}).strict();

export const FlightScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FlightScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FlightScalarWhereWithAggregatesInputSchema),z.lazy(() => FlightScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FlightScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FlightScalarWhereWithAggregatesInputSchema),z.lazy(() => FlightScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  destinationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  originId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  starshipId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  cancelled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const StarshipWhereInputSchema: z.ZodType<Prisma.StarshipWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StarshipWhereInputSchema),z.lazy(() => StarshipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarshipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarshipWhereInputSchema),z.lazy(() => StarshipWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  model: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  manufacturer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  length: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  max_atmosphering_speed: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  crew: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  passengers: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cargo_capacity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  hyperdrive_rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  MGLT: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  starship_class: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flights: z.lazy(() => FlightListRelationFilterSchema).optional()
}).strict();

export const StarshipOrderByWithRelationInputSchema: z.ZodType<Prisma.StarshipOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  model: z.lazy(() => SortOrderSchema).optional(),
  manufacturer: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  max_atmosphering_speed: z.lazy(() => SortOrderSchema).optional(),
  crew: z.lazy(() => SortOrderSchema).optional(),
  passengers: z.lazy(() => SortOrderSchema).optional(),
  cargo_capacity: z.lazy(() => SortOrderSchema).optional(),
  hyperdrive_rating: z.lazy(() => SortOrderSchema).optional(),
  MGLT: z.lazy(() => SortOrderSchema).optional(),
  starship_class: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  img: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flights: z.lazy(() => FlightOrderByRelationAggregateInputSchema).optional()
}).strict();

export const StarshipWhereUniqueInputSchema: z.ZodType<Prisma.StarshipWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => StarshipWhereInputSchema),z.lazy(() => StarshipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarshipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarshipWhereInputSchema),z.lazy(() => StarshipWhereInputSchema).array() ]).optional(),
  model: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  manufacturer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  length: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  max_atmosphering_speed: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  crew: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  passengers: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  cargo_capacity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  hyperdrive_rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  MGLT: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  starship_class: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flights: z.lazy(() => FlightListRelationFilterSchema).optional()
}).strict());

export const StarshipOrderByWithAggregationInputSchema: z.ZodType<Prisma.StarshipOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  model: z.lazy(() => SortOrderSchema).optional(),
  manufacturer: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  max_atmosphering_speed: z.lazy(() => SortOrderSchema).optional(),
  crew: z.lazy(() => SortOrderSchema).optional(),
  passengers: z.lazy(() => SortOrderSchema).optional(),
  cargo_capacity: z.lazy(() => SortOrderSchema).optional(),
  hyperdrive_rating: z.lazy(() => SortOrderSchema).optional(),
  MGLT: z.lazy(() => SortOrderSchema).optional(),
  starship_class: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  img: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => StarshipCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StarshipAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StarshipMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StarshipMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StarshipSumOrderByAggregateInputSchema).optional()
}).strict();

export const StarshipScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StarshipScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StarshipScalarWhereWithAggregatesInputSchema),z.lazy(() => StarshipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarshipScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarshipScalarWhereWithAggregatesInputSchema),z.lazy(() => StarshipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  model: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  manufacturer: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  length: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  max_atmosphering_speed: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  crew: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  passengers: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  cargo_capacity: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  hyperdrive_rating: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  MGLT: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  starship_class: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PlanetWhereInputSchema: z.ZodType<Prisma.PlanetWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlanetWhereInputSchema),z.lazy(() => PlanetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlanetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlanetWhereInputSchema),z.lazy(() => PlanetWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  terrain: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  climate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flightsAsDestination: z.lazy(() => FlightListRelationFilterSchema).optional(),
  flightsAsOrigin: z.lazy(() => FlightListRelationFilterSchema).optional()
}).strict();

export const PlanetOrderByWithRelationInputSchema: z.ZodType<Prisma.PlanetOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  terrain: z.lazy(() => SortOrderSchema).optional(),
  climate: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  img: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  flightsAsDestination: z.lazy(() => FlightOrderByRelationAggregateInputSchema).optional(),
  flightsAsOrigin: z.lazy(() => FlightOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PlanetWhereUniqueInputSchema: z.ZodType<Prisma.PlanetWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => PlanetWhereInputSchema),z.lazy(() => PlanetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlanetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlanetWhereInputSchema),z.lazy(() => PlanetWhereInputSchema).array() ]).optional(),
  terrain: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  climate: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flightsAsDestination: z.lazy(() => FlightListRelationFilterSchema).optional(),
  flightsAsOrigin: z.lazy(() => FlightListRelationFilterSchema).optional()
}).strict());

export const PlanetOrderByWithAggregationInputSchema: z.ZodType<Prisma.PlanetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  terrain: z.lazy(() => SortOrderSchema).optional(),
  climate: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  img: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PlanetCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PlanetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PlanetMinOrderByAggregateInputSchema).optional()
}).strict();

export const PlanetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PlanetScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PlanetScalarWhereWithAggregatesInputSchema),z.lazy(() => PlanetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlanetScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlanetScalarWhereWithAggregatesInputSchema),z.lazy(() => PlanetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  terrain: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  climate: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ChatConversationWhereInputSchema: z.ZodType<Prisma.ChatConversationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatConversationWhereInputSchema),z.lazy(() => ChatConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatConversationWhereInputSchema),z.lazy(() => ChatConversationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  character: z.union([ z.lazy(() => EnumChatCharacterFilterSchema),z.lazy(() => ChatCharacterSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  messages: z.lazy(() => ChatMessageListRelationFilterSchema).optional()
}).strict();

export const ChatConversationOrderByWithRelationInputSchema: z.ZodType<Prisma.ChatConversationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  character: z.lazy(() => SortOrderSchema).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  messages: z.lazy(() => ChatMessageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ChatConversationWhereUniqueInputSchema: z.ZodType<Prisma.ChatConversationWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ChatConversationWhereInputSchema),z.lazy(() => ChatConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatConversationWhereInputSchema),z.lazy(() => ChatConversationWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  character: z.union([ z.lazy(() => EnumChatCharacterFilterSchema),z.lazy(() => ChatCharacterSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  messages: z.lazy(() => ChatMessageListRelationFilterSchema).optional()
}).strict());

export const ChatConversationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChatConversationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  character: z.lazy(() => SortOrderSchema).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ChatConversationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChatConversationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChatConversationMinOrderByAggregateInputSchema).optional()
}).strict();

export const ChatConversationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChatConversationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChatConversationScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatConversationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatConversationScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  character: z.union([ z.lazy(() => EnumChatCharacterWithAggregatesFilterSchema),z.lazy(() => ChatCharacterSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ChatMessageWhereInputSchema: z.ZodType<Prisma.ChatMessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageWhereInputSchema),z.lazy(() => ChatMessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageWhereInputSchema),z.lazy(() => ChatMessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isUser: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  conversation: z.union([ z.lazy(() => ChatConversationScalarRelationFilterSchema),z.lazy(() => ChatConversationWhereInputSchema) ]).optional(),
}).strict();

export const ChatMessageOrderByWithRelationInputSchema: z.ZodType<Prisma.ChatMessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  isUser: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  conversation: z.lazy(() => ChatConversationOrderByWithRelationInputSchema).optional()
}).strict();

export const ChatMessageWhereUniqueInputSchema: z.ZodType<Prisma.ChatMessageWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ChatMessageWhereInputSchema),z.lazy(() => ChatMessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageWhereInputSchema),z.lazy(() => ChatMessageWhereInputSchema).array() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isUser: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  conversation: z.union([ z.lazy(() => ChatConversationScalarRelationFilterSchema),z.lazy(() => ChatConversationWhereInputSchema) ]).optional(),
}).strict());

export const ChatMessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChatMessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  isUser: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ChatMessageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChatMessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChatMessageMinOrderByAggregateInputSchema).optional()
}).strict();

export const ChatMessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChatMessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isUser: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => ROLESchema).optional(),
  createdAt: z.coerce.date().optional(),
  bookings: z.lazy(() => FlightCreateNestedManyWithoutBookedByInputSchema).optional(),
  createdFlights: z.lazy(() => FlightCreateNestedManyWithoutCreatorInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => ROLESchema).optional(),
  createdAt: z.coerce.date().optional(),
  bookings: z.lazy(() => FlightUncheckedCreateNestedManyWithoutBookedByInputSchema).optional(),
  createdFlights: z.lazy(() => FlightUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => ROLESchema),z.lazy(() => EnumROLEFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bookings: z.lazy(() => FlightUpdateManyWithoutBookedByNestedInputSchema).optional(),
  createdFlights: z.lazy(() => FlightUpdateManyWithoutCreatorNestedInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => ROLESchema),z.lazy(() => EnumROLEFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bookings: z.lazy(() => FlightUncheckedUpdateManyWithoutBookedByNestedInputSchema).optional(),
  createdFlights: z.lazy(() => FlightUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => ROLESchema).optional(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => ROLESchema),z.lazy(() => EnumROLEFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => ROLESchema),z.lazy(() => EnumROLEFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FlightCreateInputSchema: z.ZodType<Prisma.FlightCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  cancelled: z.boolean().optional(),
  logo: z.string().optional().nullable(),
  destination: z.lazy(() => PlanetCreateNestedOneWithoutFlightsAsDestinationInputSchema),
  origin: z.lazy(() => PlanetCreateNestedOneWithoutFlightsAsOriginInputSchema),
  starship: z.lazy(() => StarshipCreateNestedOneWithoutFlightsInputSchema),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedFlightsInputSchema),
  bookedBy: z.lazy(() => UserCreateNestedManyWithoutBookingsInputSchema).optional()
}).strict();

export const FlightUncheckedCreateInputSchema: z.ZodType<Prisma.FlightUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  destinationId: z.string(),
  originId: z.string(),
  date: z.coerce.date(),
  starshipId: z.string(),
  cancelled: z.boolean().optional(),
  creatorId: z.string(),
  logo: z.string().optional().nullable(),
  bookedBy: z.lazy(() => UserUncheckedCreateNestedManyWithoutBookingsInputSchema).optional()
}).strict();

export const FlightUpdateInputSchema: z.ZodType<Prisma.FlightUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination: z.lazy(() => PlanetUpdateOneRequiredWithoutFlightsAsDestinationNestedInputSchema).optional(),
  origin: z.lazy(() => PlanetUpdateOneRequiredWithoutFlightsAsOriginNestedInputSchema).optional(),
  starship: z.lazy(() => StarshipUpdateOneRequiredWithoutFlightsNestedInputSchema).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedFlightsNestedInputSchema).optional(),
  bookedBy: z.lazy(() => UserUpdateManyWithoutBookingsNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destinationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  starshipId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookedBy: z.lazy(() => UserUncheckedUpdateManyWithoutBookingsNestedInputSchema).optional()
}).strict();

export const FlightCreateManyInputSchema: z.ZodType<Prisma.FlightCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  destinationId: z.string(),
  originId: z.string(),
  date: z.coerce.date(),
  starshipId: z.string(),
  cancelled: z.boolean().optional(),
  creatorId: z.string(),
  logo: z.string().optional().nullable()
}).strict();

export const FlightUpdateManyMutationInputSchema: z.ZodType<Prisma.FlightUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destinationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  starshipId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StarshipCreateInputSchema: z.ZodType<Prisma.StarshipCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  length: z.number(),
  max_atmosphering_speed: z.number(),
  crew: z.number().int(),
  passengers: z.number().int(),
  cargo_capacity: z.number(),
  hyperdrive_rating: z.number(),
  MGLT: z.string(),
  starship_class: z.string(),
  slug: z.string(),
  img: z.string().optional().nullable(),
  flights: z.lazy(() => FlightCreateNestedManyWithoutStarshipInputSchema).optional()
}).strict();

export const StarshipUncheckedCreateInputSchema: z.ZodType<Prisma.StarshipUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  length: z.number(),
  max_atmosphering_speed: z.number(),
  crew: z.number().int(),
  passengers: z.number().int(),
  cargo_capacity: z.number(),
  hyperdrive_rating: z.number(),
  MGLT: z.string(),
  starship_class: z.string(),
  slug: z.string(),
  img: z.string().optional().nullable(),
  flights: z.lazy(() => FlightUncheckedCreateNestedManyWithoutStarshipInputSchema).optional()
}).strict();

export const StarshipUpdateInputSchema: z.ZodType<Prisma.StarshipUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  model: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  manufacturer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_atmosphering_speed: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  crew: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cargo_capacity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  hyperdrive_rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  MGLT: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starship_class: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flights: z.lazy(() => FlightUpdateManyWithoutStarshipNestedInputSchema).optional()
}).strict();

export const StarshipUncheckedUpdateInputSchema: z.ZodType<Prisma.StarshipUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  model: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  manufacturer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_atmosphering_speed: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  crew: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cargo_capacity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  hyperdrive_rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  MGLT: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starship_class: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flights: z.lazy(() => FlightUncheckedUpdateManyWithoutStarshipNestedInputSchema).optional()
}).strict();

export const StarshipCreateManyInputSchema: z.ZodType<Prisma.StarshipCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  length: z.number(),
  max_atmosphering_speed: z.number(),
  crew: z.number().int(),
  passengers: z.number().int(),
  cargo_capacity: z.number(),
  hyperdrive_rating: z.number(),
  MGLT: z.string(),
  starship_class: z.string(),
  slug: z.string(),
  img: z.string().optional().nullable()
}).strict();

export const StarshipUpdateManyMutationInputSchema: z.ZodType<Prisma.StarshipUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  model: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  manufacturer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_atmosphering_speed: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  crew: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cargo_capacity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  hyperdrive_rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  MGLT: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starship_class: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StarshipUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StarshipUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  model: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  manufacturer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_atmosphering_speed: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  crew: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cargo_capacity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  hyperdrive_rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  MGLT: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starship_class: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PlanetCreateInputSchema: z.ZodType<Prisma.PlanetCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  terrain: z.string(),
  climate: z.string(),
  slug: z.string(),
  img: z.string().optional().nullable(),
  flightsAsDestination: z.lazy(() => FlightCreateNestedManyWithoutDestinationInputSchema).optional(),
  flightsAsOrigin: z.lazy(() => FlightCreateNestedManyWithoutOriginInputSchema).optional()
}).strict();

export const PlanetUncheckedCreateInputSchema: z.ZodType<Prisma.PlanetUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  terrain: z.string(),
  climate: z.string(),
  slug: z.string(),
  img: z.string().optional().nullable(),
  flightsAsDestination: z.lazy(() => FlightUncheckedCreateNestedManyWithoutDestinationInputSchema).optional(),
  flightsAsOrigin: z.lazy(() => FlightUncheckedCreateNestedManyWithoutOriginInputSchema).optional()
}).strict();

export const PlanetUpdateInputSchema: z.ZodType<Prisma.PlanetUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  terrain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  climate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flightsAsDestination: z.lazy(() => FlightUpdateManyWithoutDestinationNestedInputSchema).optional(),
  flightsAsOrigin: z.lazy(() => FlightUpdateManyWithoutOriginNestedInputSchema).optional()
}).strict();

export const PlanetUncheckedUpdateInputSchema: z.ZodType<Prisma.PlanetUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  terrain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  climate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flightsAsDestination: z.lazy(() => FlightUncheckedUpdateManyWithoutDestinationNestedInputSchema).optional(),
  flightsAsOrigin: z.lazy(() => FlightUncheckedUpdateManyWithoutOriginNestedInputSchema).optional()
}).strict();

export const PlanetCreateManyInputSchema: z.ZodType<Prisma.PlanetCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  terrain: z.string(),
  climate: z.string(),
  slug: z.string(),
  img: z.string().optional().nullable()
}).strict();

export const PlanetUpdateManyMutationInputSchema: z.ZodType<Prisma.PlanetUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  terrain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  climate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PlanetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PlanetUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  terrain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  climate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatConversationCreateInputSchema: z.ZodType<Prisma.ChatConversationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  character: z.lazy(() => ChatCharacterSchema),
  title: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutChatConversationsInputSchema),
  messages: z.lazy(() => ChatMessageCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ChatConversationUncheckedCreateInputSchema: z.ZodType<Prisma.ChatConversationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  character: z.lazy(() => ChatCharacterSchema),
  title: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ChatConversationUpdateInputSchema: z.ZodType<Prisma.ChatConversationUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => EnumChatCharacterFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutChatConversationsNestedInputSchema).optional(),
  messages: z.lazy(() => ChatMessageUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ChatConversationUncheckedUpdateInputSchema: z.ZodType<Prisma.ChatConversationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => EnumChatCharacterFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ChatConversationCreateManyInputSchema: z.ZodType<Prisma.ChatConversationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  character: z.lazy(() => ChatCharacterSchema),
  title: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatConversationUpdateManyMutationInputSchema: z.ZodType<Prisma.ChatConversationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => EnumChatCharacterFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatConversationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChatConversationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => EnumChatCharacterFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageCreateInputSchema: z.ZodType<Prisma.ChatMessageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  isUser: z.boolean(),
  createdAt: z.coerce.date().optional(),
  conversation: z.lazy(() => ChatConversationCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export const ChatMessageUncheckedCreateInputSchema: z.ZodType<Prisma.ChatMessageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  conversationId: z.string(),
  content: z.string(),
  isUser: z.boolean(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ChatMessageUpdateInputSchema: z.ZodType<Prisma.ChatMessageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  conversation: z.lazy(() => ChatConversationUpdateOneRequiredWithoutMessagesNestedInputSchema).optional()
}).strict();

export const ChatMessageUncheckedUpdateInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageCreateManyInputSchema: z.ZodType<Prisma.ChatMessageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  conversationId: z.string(),
  content: z.string(),
  isUser: z.boolean(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ChatMessageUpdateManyMutationInputSchema: z.ZodType<Prisma.ChatMessageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumROLEFilterSchema: z.ZodType<Prisma.EnumROLEFilter> = z.object({
  equals: z.lazy(() => ROLESchema).optional(),
  in: z.lazy(() => ROLESchema).array().optional(),
  notIn: z.lazy(() => ROLESchema).array().optional(),
  not: z.union([ z.lazy(() => ROLESchema),z.lazy(() => NestedEnumROLEFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const FlightListRelationFilterSchema: z.ZodType<Prisma.FlightListRelationFilter> = z.object({
  every: z.lazy(() => FlightWhereInputSchema).optional(),
  some: z.lazy(() => FlightWhereInputSchema).optional(),
  none: z.lazy(() => FlightWhereInputSchema).optional()
}).strict();

export const ChatConversationListRelationFilterSchema: z.ZodType<Prisma.ChatConversationListRelationFilter> = z.object({
  every: z.lazy(() => ChatConversationWhereInputSchema).optional(),
  some: z.lazy(() => ChatConversationWhereInputSchema).optional(),
  none: z.lazy(() => ChatConversationWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const FlightOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FlightOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatConversationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ChatConversationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumROLEWithAggregatesFilterSchema: z.ZodType<Prisma.EnumROLEWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ROLESchema).optional(),
  in: z.lazy(() => ROLESchema).array().optional(),
  notIn: z.lazy(() => ROLESchema).array().optional(),
  not: z.union([ z.lazy(() => ROLESchema),z.lazy(() => NestedEnumROLEWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumROLEFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumROLEFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const PlanetScalarRelationFilterSchema: z.ZodType<Prisma.PlanetScalarRelationFilter> = z.object({
  is: z.lazy(() => PlanetWhereInputSchema).optional(),
  isNot: z.lazy(() => PlanetWhereInputSchema).optional()
}).strict();

export const StarshipScalarRelationFilterSchema: z.ZodType<Prisma.StarshipScalarRelationFilter> = z.object({
  is: z.lazy(() => StarshipWhereInputSchema).optional(),
  isNot: z.lazy(() => StarshipWhereInputSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FlightCountOrderByAggregateInputSchema: z.ZodType<Prisma.FlightCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  destinationId: z.lazy(() => SortOrderSchema).optional(),
  originId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  starshipId: z.lazy(() => SortOrderSchema).optional(),
  cancelled: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FlightMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FlightMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  destinationId: z.lazy(() => SortOrderSchema).optional(),
  originId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  starshipId: z.lazy(() => SortOrderSchema).optional(),
  cancelled: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FlightMinOrderByAggregateInputSchema: z.ZodType<Prisma.FlightMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  destinationId: z.lazy(() => SortOrderSchema).optional(),
  originId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  starshipId: z.lazy(() => SortOrderSchema).optional(),
  cancelled: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StarshipCountOrderByAggregateInputSchema: z.ZodType<Prisma.StarshipCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  model: z.lazy(() => SortOrderSchema).optional(),
  manufacturer: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  max_atmosphering_speed: z.lazy(() => SortOrderSchema).optional(),
  crew: z.lazy(() => SortOrderSchema).optional(),
  passengers: z.lazy(() => SortOrderSchema).optional(),
  cargo_capacity: z.lazy(() => SortOrderSchema).optional(),
  hyperdrive_rating: z.lazy(() => SortOrderSchema).optional(),
  MGLT: z.lazy(() => SortOrderSchema).optional(),
  starship_class: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StarshipAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StarshipAvgOrderByAggregateInput> = z.object({
  length: z.lazy(() => SortOrderSchema).optional(),
  max_atmosphering_speed: z.lazy(() => SortOrderSchema).optional(),
  crew: z.lazy(() => SortOrderSchema).optional(),
  passengers: z.lazy(() => SortOrderSchema).optional(),
  cargo_capacity: z.lazy(() => SortOrderSchema).optional(),
  hyperdrive_rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StarshipMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StarshipMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  model: z.lazy(() => SortOrderSchema).optional(),
  manufacturer: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  max_atmosphering_speed: z.lazy(() => SortOrderSchema).optional(),
  crew: z.lazy(() => SortOrderSchema).optional(),
  passengers: z.lazy(() => SortOrderSchema).optional(),
  cargo_capacity: z.lazy(() => SortOrderSchema).optional(),
  hyperdrive_rating: z.lazy(() => SortOrderSchema).optional(),
  MGLT: z.lazy(() => SortOrderSchema).optional(),
  starship_class: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StarshipMinOrderByAggregateInputSchema: z.ZodType<Prisma.StarshipMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  model: z.lazy(() => SortOrderSchema).optional(),
  manufacturer: z.lazy(() => SortOrderSchema).optional(),
  length: z.lazy(() => SortOrderSchema).optional(),
  max_atmosphering_speed: z.lazy(() => SortOrderSchema).optional(),
  crew: z.lazy(() => SortOrderSchema).optional(),
  passengers: z.lazy(() => SortOrderSchema).optional(),
  cargo_capacity: z.lazy(() => SortOrderSchema).optional(),
  hyperdrive_rating: z.lazy(() => SortOrderSchema).optional(),
  MGLT: z.lazy(() => SortOrderSchema).optional(),
  starship_class: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StarshipSumOrderByAggregateInputSchema: z.ZodType<Prisma.StarshipSumOrderByAggregateInput> = z.object({
  length: z.lazy(() => SortOrderSchema).optional(),
  max_atmosphering_speed: z.lazy(() => SortOrderSchema).optional(),
  crew: z.lazy(() => SortOrderSchema).optional(),
  passengers: z.lazy(() => SortOrderSchema).optional(),
  cargo_capacity: z.lazy(() => SortOrderSchema).optional(),
  hyperdrive_rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const PlanetCountOrderByAggregateInputSchema: z.ZodType<Prisma.PlanetCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  terrain: z.lazy(() => SortOrderSchema).optional(),
  climate: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlanetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PlanetMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  terrain: z.lazy(() => SortOrderSchema).optional(),
  climate: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlanetMinOrderByAggregateInputSchema: z.ZodType<Prisma.PlanetMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  terrain: z.lazy(() => SortOrderSchema).optional(),
  climate: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumChatCharacterFilterSchema: z.ZodType<Prisma.EnumChatCharacterFilter> = z.object({
  equals: z.lazy(() => ChatCharacterSchema).optional(),
  in: z.lazy(() => ChatCharacterSchema).array().optional(),
  notIn: z.lazy(() => ChatCharacterSchema).array().optional(),
  not: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => NestedEnumChatCharacterFilterSchema) ]).optional(),
}).strict();

export const ChatMessageListRelationFilterSchema: z.ZodType<Prisma.ChatMessageListRelationFilter> = z.object({
  every: z.lazy(() => ChatMessageWhereInputSchema).optional(),
  some: z.lazy(() => ChatMessageWhereInputSchema).optional(),
  none: z.lazy(() => ChatMessageWhereInputSchema).optional()
}).strict();

export const ChatMessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ChatMessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatConversationCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChatConversationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  character: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatConversationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChatConversationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  character: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatConversationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChatConversationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  character: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumChatCharacterWithAggregatesFilterSchema: z.ZodType<Prisma.EnumChatCharacterWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ChatCharacterSchema).optional(),
  in: z.lazy(() => ChatCharacterSchema).array().optional(),
  notIn: z.lazy(() => ChatCharacterSchema).array().optional(),
  not: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => NestedEnumChatCharacterWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumChatCharacterFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumChatCharacterFilterSchema).optional()
}).strict();

export const ChatConversationScalarRelationFilterSchema: z.ZodType<Prisma.ChatConversationScalarRelationFilter> = z.object({
  is: z.lazy(() => ChatConversationWhereInputSchema).optional(),
  isNot: z.lazy(() => ChatConversationWhereInputSchema).optional()
}).strict();

export const ChatMessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMessageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  isUser: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatMessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMessageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  isUser: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatMessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  isUser: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FlightCreateNestedManyWithoutBookedByInputSchema: z.ZodType<Prisma.FlightCreateNestedManyWithoutBookedByInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutBookedByInputSchema),z.lazy(() => FlightCreateWithoutBookedByInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutBookedByInputSchema),z.lazy(() => FlightUncheckedCreateWithoutBookedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutBookedByInputSchema),z.lazy(() => FlightCreateOrConnectWithoutBookedByInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightCreateNestedManyWithoutCreatorInputSchema: z.ZodType<Prisma.FlightCreateNestedManyWithoutCreatorInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutCreatorInputSchema),z.lazy(() => FlightCreateWithoutCreatorInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => FlightUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => FlightCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyCreatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatConversationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ChatConversationCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ChatConversationCreateWithoutUserInputSchema),z.lazy(() => ChatConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ChatConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatConversationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatConversationWhereUniqueInputSchema),z.lazy(() => ChatConversationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedCreateNestedManyWithoutBookedByInputSchema: z.ZodType<Prisma.FlightUncheckedCreateNestedManyWithoutBookedByInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutBookedByInputSchema),z.lazy(() => FlightCreateWithoutBookedByInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutBookedByInputSchema),z.lazy(() => FlightUncheckedCreateWithoutBookedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutBookedByInputSchema),z.lazy(() => FlightCreateOrConnectWithoutBookedByInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedCreateNestedManyWithoutCreatorInputSchema: z.ZodType<Prisma.FlightUncheckedCreateNestedManyWithoutCreatorInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutCreatorInputSchema),z.lazy(() => FlightCreateWithoutCreatorInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => FlightUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => FlightCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyCreatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatConversationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ChatConversationCreateWithoutUserInputSchema),z.lazy(() => ChatConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ChatConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatConversationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatConversationWhereUniqueInputSchema),z.lazy(() => ChatConversationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const EnumROLEFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumROLEFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ROLESchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const FlightUpdateManyWithoutBookedByNestedInputSchema: z.ZodType<Prisma.FlightUpdateManyWithoutBookedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutBookedByInputSchema),z.lazy(() => FlightCreateWithoutBookedByInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutBookedByInputSchema),z.lazy(() => FlightUncheckedCreateWithoutBookedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutBookedByInputSchema),z.lazy(() => FlightCreateOrConnectWithoutBookedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutBookedByInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutBookedByInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutBookedByInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutBookedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutBookedByInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutBookedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<Prisma.FlightUpdateManyWithoutCreatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutCreatorInputSchema),z.lazy(() => FlightCreateWithoutCreatorInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => FlightUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => FlightCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyCreatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutCreatorInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutCreatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatConversationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ChatConversationUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatConversationCreateWithoutUserInputSchema),z.lazy(() => ChatConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ChatConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatConversationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatConversationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatConversationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatConversationWhereUniqueInputSchema),z.lazy(() => ChatConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatConversationWhereUniqueInputSchema),z.lazy(() => ChatConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatConversationWhereUniqueInputSchema),z.lazy(() => ChatConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatConversationWhereUniqueInputSchema),z.lazy(() => ChatConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatConversationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatConversationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatConversationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ChatConversationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatConversationScalarWhereInputSchema),z.lazy(() => ChatConversationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedUpdateManyWithoutBookedByNestedInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutBookedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutBookedByInputSchema),z.lazy(() => FlightCreateWithoutBookedByInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutBookedByInputSchema),z.lazy(() => FlightUncheckedCreateWithoutBookedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutBookedByInputSchema),z.lazy(() => FlightCreateOrConnectWithoutBookedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutBookedByInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutBookedByInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutBookedByInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutBookedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutBookedByInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutBookedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutCreatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutCreatorInputSchema),z.lazy(() => FlightCreateWithoutCreatorInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => FlightUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => FlightCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyCreatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutCreatorInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutCreatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatConversationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatConversationCreateWithoutUserInputSchema),z.lazy(() => ChatConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ChatConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatConversationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatConversationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatConversationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatConversationWhereUniqueInputSchema),z.lazy(() => ChatConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatConversationWhereUniqueInputSchema),z.lazy(() => ChatConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatConversationWhereUniqueInputSchema),z.lazy(() => ChatConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatConversationWhereUniqueInputSchema),z.lazy(() => ChatConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatConversationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatConversationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatConversationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ChatConversationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatConversationScalarWhereInputSchema),z.lazy(() => ChatConversationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PlanetCreateNestedOneWithoutFlightsAsDestinationInputSchema: z.ZodType<Prisma.PlanetCreateNestedOneWithoutFlightsAsDestinationInput> = z.object({
  create: z.union([ z.lazy(() => PlanetCreateWithoutFlightsAsDestinationInputSchema),z.lazy(() => PlanetUncheckedCreateWithoutFlightsAsDestinationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlanetCreateOrConnectWithoutFlightsAsDestinationInputSchema).optional(),
  connect: z.lazy(() => PlanetWhereUniqueInputSchema).optional()
}).strict();

export const PlanetCreateNestedOneWithoutFlightsAsOriginInputSchema: z.ZodType<Prisma.PlanetCreateNestedOneWithoutFlightsAsOriginInput> = z.object({
  create: z.union([ z.lazy(() => PlanetCreateWithoutFlightsAsOriginInputSchema),z.lazy(() => PlanetUncheckedCreateWithoutFlightsAsOriginInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlanetCreateOrConnectWithoutFlightsAsOriginInputSchema).optional(),
  connect: z.lazy(() => PlanetWhereUniqueInputSchema).optional()
}).strict();

export const StarshipCreateNestedOneWithoutFlightsInputSchema: z.ZodType<Prisma.StarshipCreateNestedOneWithoutFlightsInput> = z.object({
  create: z.union([ z.lazy(() => StarshipCreateWithoutFlightsInputSchema),z.lazy(() => StarshipUncheckedCreateWithoutFlightsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StarshipCreateOrConnectWithoutFlightsInputSchema).optional(),
  connect: z.lazy(() => StarshipWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutCreatedFlightsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedFlightsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedFlightsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedFlightsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedFlightsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedManyWithoutBookingsInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutBookingsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBookingsInputSchema),z.lazy(() => UserCreateWithoutBookingsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutBookingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookingsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBookingsInputSchema),z.lazy(() => UserCreateOrConnectWithoutBookingsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutBookingsInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutBookingsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBookingsInputSchema),z.lazy(() => UserCreateWithoutBookingsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutBookingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookingsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBookingsInputSchema),z.lazy(() => UserCreateOrConnectWithoutBookingsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const PlanetUpdateOneRequiredWithoutFlightsAsDestinationNestedInputSchema: z.ZodType<Prisma.PlanetUpdateOneRequiredWithoutFlightsAsDestinationNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlanetCreateWithoutFlightsAsDestinationInputSchema),z.lazy(() => PlanetUncheckedCreateWithoutFlightsAsDestinationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlanetCreateOrConnectWithoutFlightsAsDestinationInputSchema).optional(),
  upsert: z.lazy(() => PlanetUpsertWithoutFlightsAsDestinationInputSchema).optional(),
  connect: z.lazy(() => PlanetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlanetUpdateToOneWithWhereWithoutFlightsAsDestinationInputSchema),z.lazy(() => PlanetUpdateWithoutFlightsAsDestinationInputSchema),z.lazy(() => PlanetUncheckedUpdateWithoutFlightsAsDestinationInputSchema) ]).optional(),
}).strict();

export const PlanetUpdateOneRequiredWithoutFlightsAsOriginNestedInputSchema: z.ZodType<Prisma.PlanetUpdateOneRequiredWithoutFlightsAsOriginNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlanetCreateWithoutFlightsAsOriginInputSchema),z.lazy(() => PlanetUncheckedCreateWithoutFlightsAsOriginInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlanetCreateOrConnectWithoutFlightsAsOriginInputSchema).optional(),
  upsert: z.lazy(() => PlanetUpsertWithoutFlightsAsOriginInputSchema).optional(),
  connect: z.lazy(() => PlanetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlanetUpdateToOneWithWhereWithoutFlightsAsOriginInputSchema),z.lazy(() => PlanetUpdateWithoutFlightsAsOriginInputSchema),z.lazy(() => PlanetUncheckedUpdateWithoutFlightsAsOriginInputSchema) ]).optional(),
}).strict();

export const StarshipUpdateOneRequiredWithoutFlightsNestedInputSchema: z.ZodType<Prisma.StarshipUpdateOneRequiredWithoutFlightsNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarshipCreateWithoutFlightsInputSchema),z.lazy(() => StarshipUncheckedCreateWithoutFlightsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StarshipCreateOrConnectWithoutFlightsInputSchema).optional(),
  upsert: z.lazy(() => StarshipUpsertWithoutFlightsInputSchema).optional(),
  connect: z.lazy(() => StarshipWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StarshipUpdateToOneWithWhereWithoutFlightsInputSchema),z.lazy(() => StarshipUpdateWithoutFlightsInputSchema),z.lazy(() => StarshipUncheckedUpdateWithoutFlightsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCreatedFlightsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCreatedFlightsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedFlightsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedFlightsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedFlightsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCreatedFlightsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCreatedFlightsInputSchema),z.lazy(() => UserUpdateWithoutCreatedFlightsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedFlightsInputSchema) ]).optional(),
}).strict();

export const UserUpdateManyWithoutBookingsNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutBookingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBookingsInputSchema),z.lazy(() => UserCreateWithoutBookingsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutBookingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookingsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBookingsInputSchema),z.lazy(() => UserCreateOrConnectWithoutBookingsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutBookingsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutBookingsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutBookingsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutBookingsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutBookingsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutBookingsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutBookingsNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutBookingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBookingsInputSchema),z.lazy(() => UserCreateWithoutBookingsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutBookingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookingsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutBookingsInputSchema),z.lazy(() => UserCreateOrConnectWithoutBookingsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutBookingsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutBookingsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutBookingsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutBookingsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutBookingsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutBookingsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightCreateNestedManyWithoutStarshipInputSchema: z.ZodType<Prisma.FlightCreateNestedManyWithoutStarshipInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutStarshipInputSchema),z.lazy(() => FlightCreateWithoutStarshipInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutStarshipInputSchema),z.lazy(() => FlightUncheckedCreateWithoutStarshipInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutStarshipInputSchema),z.lazy(() => FlightCreateOrConnectWithoutStarshipInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyStarshipInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedCreateNestedManyWithoutStarshipInputSchema: z.ZodType<Prisma.FlightUncheckedCreateNestedManyWithoutStarshipInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutStarshipInputSchema),z.lazy(() => FlightCreateWithoutStarshipInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutStarshipInputSchema),z.lazy(() => FlightUncheckedCreateWithoutStarshipInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutStarshipInputSchema),z.lazy(() => FlightCreateOrConnectWithoutStarshipInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyStarshipInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const FlightUpdateManyWithoutStarshipNestedInputSchema: z.ZodType<Prisma.FlightUpdateManyWithoutStarshipNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutStarshipInputSchema),z.lazy(() => FlightCreateWithoutStarshipInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutStarshipInputSchema),z.lazy(() => FlightUncheckedCreateWithoutStarshipInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutStarshipInputSchema),z.lazy(() => FlightCreateOrConnectWithoutStarshipInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutStarshipInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutStarshipInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyStarshipInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutStarshipInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutStarshipInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutStarshipInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutStarshipInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedUpdateManyWithoutStarshipNestedInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutStarshipNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutStarshipInputSchema),z.lazy(() => FlightCreateWithoutStarshipInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutStarshipInputSchema),z.lazy(() => FlightUncheckedCreateWithoutStarshipInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutStarshipInputSchema),z.lazy(() => FlightCreateOrConnectWithoutStarshipInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutStarshipInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutStarshipInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyStarshipInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutStarshipInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutStarshipInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutStarshipInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutStarshipInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightCreateNestedManyWithoutDestinationInputSchema: z.ZodType<Prisma.FlightCreateNestedManyWithoutDestinationInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutDestinationInputSchema),z.lazy(() => FlightCreateWithoutDestinationInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutDestinationInputSchema),z.lazy(() => FlightUncheckedCreateWithoutDestinationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutDestinationInputSchema),z.lazy(() => FlightCreateOrConnectWithoutDestinationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyDestinationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightCreateNestedManyWithoutOriginInputSchema: z.ZodType<Prisma.FlightCreateNestedManyWithoutOriginInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutOriginInputSchema),z.lazy(() => FlightCreateWithoutOriginInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutOriginInputSchema),z.lazy(() => FlightUncheckedCreateWithoutOriginInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutOriginInputSchema),z.lazy(() => FlightCreateOrConnectWithoutOriginInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyOriginInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedCreateNestedManyWithoutDestinationInputSchema: z.ZodType<Prisma.FlightUncheckedCreateNestedManyWithoutDestinationInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutDestinationInputSchema),z.lazy(() => FlightCreateWithoutDestinationInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutDestinationInputSchema),z.lazy(() => FlightUncheckedCreateWithoutDestinationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutDestinationInputSchema),z.lazy(() => FlightCreateOrConnectWithoutDestinationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyDestinationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedCreateNestedManyWithoutOriginInputSchema: z.ZodType<Prisma.FlightUncheckedCreateNestedManyWithoutOriginInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutOriginInputSchema),z.lazy(() => FlightCreateWithoutOriginInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutOriginInputSchema),z.lazy(() => FlightUncheckedCreateWithoutOriginInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutOriginInputSchema),z.lazy(() => FlightCreateOrConnectWithoutOriginInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyOriginInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightUpdateManyWithoutDestinationNestedInputSchema: z.ZodType<Prisma.FlightUpdateManyWithoutDestinationNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutDestinationInputSchema),z.lazy(() => FlightCreateWithoutDestinationInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutDestinationInputSchema),z.lazy(() => FlightUncheckedCreateWithoutDestinationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutDestinationInputSchema),z.lazy(() => FlightCreateOrConnectWithoutDestinationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutDestinationInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutDestinationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyDestinationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutDestinationInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutDestinationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutDestinationInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutDestinationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightUpdateManyWithoutOriginNestedInputSchema: z.ZodType<Prisma.FlightUpdateManyWithoutOriginNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutOriginInputSchema),z.lazy(() => FlightCreateWithoutOriginInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutOriginInputSchema),z.lazy(() => FlightUncheckedCreateWithoutOriginInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutOriginInputSchema),z.lazy(() => FlightCreateOrConnectWithoutOriginInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutOriginInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutOriginInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyOriginInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutOriginInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutOriginInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutOriginInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutOriginInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedUpdateManyWithoutDestinationNestedInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutDestinationNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutDestinationInputSchema),z.lazy(() => FlightCreateWithoutDestinationInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutDestinationInputSchema),z.lazy(() => FlightUncheckedCreateWithoutDestinationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutDestinationInputSchema),z.lazy(() => FlightCreateOrConnectWithoutDestinationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutDestinationInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutDestinationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyDestinationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutDestinationInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutDestinationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutDestinationInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutDestinationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedUpdateManyWithoutOriginNestedInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutOriginNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutOriginInputSchema),z.lazy(() => FlightCreateWithoutOriginInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutOriginInputSchema),z.lazy(() => FlightUncheckedCreateWithoutOriginInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutOriginInputSchema),z.lazy(() => FlightCreateOrConnectWithoutOriginInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutOriginInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutOriginInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyOriginInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutOriginInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutOriginInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutOriginInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutOriginInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutChatConversationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutChatConversationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatConversationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatConversationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatConversationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ChatMessageCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateWithoutConversationInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatMessageUncheckedCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUncheckedCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateWithoutConversationInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumChatCharacterFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumChatCharacterFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ChatCharacterSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutChatConversationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutChatConversationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatConversationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatConversationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatConversationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutChatConversationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutChatConversationsInputSchema),z.lazy(() => UserUpdateWithoutChatConversationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatConversationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.ChatMessageUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateWithoutConversationInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => ChatMessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatMessageUncheckedUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateWithoutConversationInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => ChatMessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatConversationCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.ChatConversationCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => ChatConversationCreateWithoutMessagesInputSchema),z.lazy(() => ChatConversationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChatConversationCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ChatConversationWhereUniqueInputSchema).optional()
}).strict();

export const ChatConversationUpdateOneRequiredWithoutMessagesNestedInputSchema: z.ZodType<Prisma.ChatConversationUpdateOneRequiredWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatConversationCreateWithoutMessagesInputSchema),z.lazy(() => ChatConversationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChatConversationCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => ChatConversationUpsertWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ChatConversationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ChatConversationUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => ChatConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ChatConversationUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumROLEFilterSchema: z.ZodType<Prisma.NestedEnumROLEFilter> = z.object({
  equals: z.lazy(() => ROLESchema).optional(),
  in: z.lazy(() => ROLESchema).array().optional(),
  notIn: z.lazy(() => ROLESchema).array().optional(),
  not: z.union([ z.lazy(() => ROLESchema),z.lazy(() => NestedEnumROLEFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumROLEWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumROLEWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ROLESchema).optional(),
  in: z.lazy(() => ROLESchema).array().optional(),
  notIn: z.lazy(() => ROLESchema).array().optional(),
  not: z.union([ z.lazy(() => ROLESchema),z.lazy(() => NestedEnumROLEWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumROLEFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumROLEFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedEnumChatCharacterFilterSchema: z.ZodType<Prisma.NestedEnumChatCharacterFilter> = z.object({
  equals: z.lazy(() => ChatCharacterSchema).optional(),
  in: z.lazy(() => ChatCharacterSchema).array().optional(),
  notIn: z.lazy(() => ChatCharacterSchema).array().optional(),
  not: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => NestedEnumChatCharacterFilterSchema) ]).optional(),
}).strict();

export const NestedEnumChatCharacterWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumChatCharacterWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ChatCharacterSchema).optional(),
  in: z.lazy(() => ChatCharacterSchema).array().optional(),
  notIn: z.lazy(() => ChatCharacterSchema).array().optional(),
  not: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => NestedEnumChatCharacterWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumChatCharacterFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumChatCharacterFilterSchema).optional()
}).strict();

export const FlightCreateWithoutBookedByInputSchema: z.ZodType<Prisma.FlightCreateWithoutBookedByInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  cancelled: z.boolean().optional(),
  logo: z.string().optional().nullable(),
  destination: z.lazy(() => PlanetCreateNestedOneWithoutFlightsAsDestinationInputSchema),
  origin: z.lazy(() => PlanetCreateNestedOneWithoutFlightsAsOriginInputSchema),
  starship: z.lazy(() => StarshipCreateNestedOneWithoutFlightsInputSchema),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedFlightsInputSchema)
}).strict();

export const FlightUncheckedCreateWithoutBookedByInputSchema: z.ZodType<Prisma.FlightUncheckedCreateWithoutBookedByInput> = z.object({
  id: z.string().cuid().optional(),
  destinationId: z.string(),
  originId: z.string(),
  date: z.coerce.date(),
  starshipId: z.string(),
  cancelled: z.boolean().optional(),
  creatorId: z.string(),
  logo: z.string().optional().nullable()
}).strict();

export const FlightCreateOrConnectWithoutBookedByInputSchema: z.ZodType<Prisma.FlightCreateOrConnectWithoutBookedByInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FlightCreateWithoutBookedByInputSchema),z.lazy(() => FlightUncheckedCreateWithoutBookedByInputSchema) ]),
}).strict();

export const FlightCreateWithoutCreatorInputSchema: z.ZodType<Prisma.FlightCreateWithoutCreatorInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  cancelled: z.boolean().optional(),
  logo: z.string().optional().nullable(),
  destination: z.lazy(() => PlanetCreateNestedOneWithoutFlightsAsDestinationInputSchema),
  origin: z.lazy(() => PlanetCreateNestedOneWithoutFlightsAsOriginInputSchema),
  starship: z.lazy(() => StarshipCreateNestedOneWithoutFlightsInputSchema),
  bookedBy: z.lazy(() => UserCreateNestedManyWithoutBookingsInputSchema).optional()
}).strict();

export const FlightUncheckedCreateWithoutCreatorInputSchema: z.ZodType<Prisma.FlightUncheckedCreateWithoutCreatorInput> = z.object({
  id: z.string().cuid().optional(),
  destinationId: z.string(),
  originId: z.string(),
  date: z.coerce.date(),
  starshipId: z.string(),
  cancelled: z.boolean().optional(),
  logo: z.string().optional().nullable(),
  bookedBy: z.lazy(() => UserUncheckedCreateNestedManyWithoutBookingsInputSchema).optional()
}).strict();

export const FlightCreateOrConnectWithoutCreatorInputSchema: z.ZodType<Prisma.FlightCreateOrConnectWithoutCreatorInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FlightCreateWithoutCreatorInputSchema),z.lazy(() => FlightUncheckedCreateWithoutCreatorInputSchema) ]),
}).strict();

export const FlightCreateManyCreatorInputEnvelopeSchema: z.ZodType<Prisma.FlightCreateManyCreatorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FlightCreateManyCreatorInputSchema),z.lazy(() => FlightCreateManyCreatorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ChatConversationCreateWithoutUserInputSchema: z.ZodType<Prisma.ChatConversationCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  character: z.lazy(() => ChatCharacterSchema),
  title: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => ChatMessageCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ChatConversationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ChatConversationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  character: z.lazy(() => ChatCharacterSchema),
  title: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ChatConversationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ChatConversationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ChatConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatConversationCreateWithoutUserInputSchema),z.lazy(() => ChatConversationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ChatConversationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ChatConversationCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChatConversationCreateManyUserInputSchema),z.lazy(() => ChatConversationCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FlightUpsertWithWhereUniqueWithoutBookedByInputSchema: z.ZodType<Prisma.FlightUpsertWithWhereUniqueWithoutBookedByInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FlightUpdateWithoutBookedByInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutBookedByInputSchema) ]),
  create: z.union([ z.lazy(() => FlightCreateWithoutBookedByInputSchema),z.lazy(() => FlightUncheckedCreateWithoutBookedByInputSchema) ]),
}).strict();

export const FlightUpdateWithWhereUniqueWithoutBookedByInputSchema: z.ZodType<Prisma.FlightUpdateWithWhereUniqueWithoutBookedByInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateWithoutBookedByInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutBookedByInputSchema) ]),
}).strict();

export const FlightUpdateManyWithWhereWithoutBookedByInputSchema: z.ZodType<Prisma.FlightUpdateManyWithWhereWithoutBookedByInput> = z.object({
  where: z.lazy(() => FlightScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateManyMutationInputSchema),z.lazy(() => FlightUncheckedUpdateManyWithoutBookedByInputSchema) ]),
}).strict();

export const FlightScalarWhereInputSchema: z.ZodType<Prisma.FlightScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FlightScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  destinationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  originId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  starshipId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cancelled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const FlightUpsertWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.FlightUpsertWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FlightUpdateWithoutCreatorInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutCreatorInputSchema) ]),
  create: z.union([ z.lazy(() => FlightCreateWithoutCreatorInputSchema),z.lazy(() => FlightUncheckedCreateWithoutCreatorInputSchema) ]),
}).strict();

export const FlightUpdateWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.FlightUpdateWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateWithoutCreatorInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutCreatorInputSchema) ]),
}).strict();

export const FlightUpdateManyWithWhereWithoutCreatorInputSchema: z.ZodType<Prisma.FlightUpdateManyWithWhereWithoutCreatorInput> = z.object({
  where: z.lazy(() => FlightScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateManyMutationInputSchema),z.lazy(() => FlightUncheckedUpdateManyWithoutCreatorInputSchema) ]),
}).strict();

export const ChatConversationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ChatConversationUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ChatConversationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatConversationUpdateWithoutUserInputSchema),z.lazy(() => ChatConversationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ChatConversationCreateWithoutUserInputSchema),z.lazy(() => ChatConversationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ChatConversationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ChatConversationUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ChatConversationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatConversationUpdateWithoutUserInputSchema),z.lazy(() => ChatConversationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ChatConversationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ChatConversationUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ChatConversationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatConversationUpdateManyMutationInputSchema),z.lazy(() => ChatConversationUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ChatConversationScalarWhereInputSchema: z.ZodType<Prisma.ChatConversationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatConversationScalarWhereInputSchema),z.lazy(() => ChatConversationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatConversationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatConversationScalarWhereInputSchema),z.lazy(() => ChatConversationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  character: z.union([ z.lazy(() => EnumChatCharacterFilterSchema),z.lazy(() => ChatCharacterSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PlanetCreateWithoutFlightsAsDestinationInputSchema: z.ZodType<Prisma.PlanetCreateWithoutFlightsAsDestinationInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  terrain: z.string(),
  climate: z.string(),
  slug: z.string(),
  img: z.string().optional().nullable(),
  flightsAsOrigin: z.lazy(() => FlightCreateNestedManyWithoutOriginInputSchema).optional()
}).strict();

export const PlanetUncheckedCreateWithoutFlightsAsDestinationInputSchema: z.ZodType<Prisma.PlanetUncheckedCreateWithoutFlightsAsDestinationInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  terrain: z.string(),
  climate: z.string(),
  slug: z.string(),
  img: z.string().optional().nullable(),
  flightsAsOrigin: z.lazy(() => FlightUncheckedCreateNestedManyWithoutOriginInputSchema).optional()
}).strict();

export const PlanetCreateOrConnectWithoutFlightsAsDestinationInputSchema: z.ZodType<Prisma.PlanetCreateOrConnectWithoutFlightsAsDestinationInput> = z.object({
  where: z.lazy(() => PlanetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlanetCreateWithoutFlightsAsDestinationInputSchema),z.lazy(() => PlanetUncheckedCreateWithoutFlightsAsDestinationInputSchema) ]),
}).strict();

export const PlanetCreateWithoutFlightsAsOriginInputSchema: z.ZodType<Prisma.PlanetCreateWithoutFlightsAsOriginInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  terrain: z.string(),
  climate: z.string(),
  slug: z.string(),
  img: z.string().optional().nullable(),
  flightsAsDestination: z.lazy(() => FlightCreateNestedManyWithoutDestinationInputSchema).optional()
}).strict();

export const PlanetUncheckedCreateWithoutFlightsAsOriginInputSchema: z.ZodType<Prisma.PlanetUncheckedCreateWithoutFlightsAsOriginInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  terrain: z.string(),
  climate: z.string(),
  slug: z.string(),
  img: z.string().optional().nullable(),
  flightsAsDestination: z.lazy(() => FlightUncheckedCreateNestedManyWithoutDestinationInputSchema).optional()
}).strict();

export const PlanetCreateOrConnectWithoutFlightsAsOriginInputSchema: z.ZodType<Prisma.PlanetCreateOrConnectWithoutFlightsAsOriginInput> = z.object({
  where: z.lazy(() => PlanetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlanetCreateWithoutFlightsAsOriginInputSchema),z.lazy(() => PlanetUncheckedCreateWithoutFlightsAsOriginInputSchema) ]),
}).strict();

export const StarshipCreateWithoutFlightsInputSchema: z.ZodType<Prisma.StarshipCreateWithoutFlightsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  length: z.number(),
  max_atmosphering_speed: z.number(),
  crew: z.number().int(),
  passengers: z.number().int(),
  cargo_capacity: z.number(),
  hyperdrive_rating: z.number(),
  MGLT: z.string(),
  starship_class: z.string(),
  slug: z.string(),
  img: z.string().optional().nullable()
}).strict();

export const StarshipUncheckedCreateWithoutFlightsInputSchema: z.ZodType<Prisma.StarshipUncheckedCreateWithoutFlightsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  length: z.number(),
  max_atmosphering_speed: z.number(),
  crew: z.number().int(),
  passengers: z.number().int(),
  cargo_capacity: z.number(),
  hyperdrive_rating: z.number(),
  MGLT: z.string(),
  starship_class: z.string(),
  slug: z.string(),
  img: z.string().optional().nullable()
}).strict();

export const StarshipCreateOrConnectWithoutFlightsInputSchema: z.ZodType<Prisma.StarshipCreateOrConnectWithoutFlightsInput> = z.object({
  where: z.lazy(() => StarshipWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StarshipCreateWithoutFlightsInputSchema),z.lazy(() => StarshipUncheckedCreateWithoutFlightsInputSchema) ]),
}).strict();

export const UserCreateWithoutCreatedFlightsInputSchema: z.ZodType<Prisma.UserCreateWithoutCreatedFlightsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => ROLESchema).optional(),
  createdAt: z.coerce.date().optional(),
  bookings: z.lazy(() => FlightCreateNestedManyWithoutBookedByInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCreatedFlightsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCreatedFlightsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => ROLESchema).optional(),
  createdAt: z.coerce.date().optional(),
  bookings: z.lazy(() => FlightUncheckedCreateNestedManyWithoutBookedByInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCreatedFlightsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedFlightsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedFlightsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedFlightsInputSchema) ]),
}).strict();

export const UserCreateWithoutBookingsInputSchema: z.ZodType<Prisma.UserCreateWithoutBookingsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => ROLESchema).optional(),
  createdAt: z.coerce.date().optional(),
  createdFlights: z.lazy(() => FlightCreateNestedManyWithoutCreatorInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutBookingsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBookingsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => ROLESchema).optional(),
  createdAt: z.coerce.date().optional(),
  createdFlights: z.lazy(() => FlightUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutBookingsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBookingsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBookingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookingsInputSchema) ]),
}).strict();

export const PlanetUpsertWithoutFlightsAsDestinationInputSchema: z.ZodType<Prisma.PlanetUpsertWithoutFlightsAsDestinationInput> = z.object({
  update: z.union([ z.lazy(() => PlanetUpdateWithoutFlightsAsDestinationInputSchema),z.lazy(() => PlanetUncheckedUpdateWithoutFlightsAsDestinationInputSchema) ]),
  create: z.union([ z.lazy(() => PlanetCreateWithoutFlightsAsDestinationInputSchema),z.lazy(() => PlanetUncheckedCreateWithoutFlightsAsDestinationInputSchema) ]),
  where: z.lazy(() => PlanetWhereInputSchema).optional()
}).strict();

export const PlanetUpdateToOneWithWhereWithoutFlightsAsDestinationInputSchema: z.ZodType<Prisma.PlanetUpdateToOneWithWhereWithoutFlightsAsDestinationInput> = z.object({
  where: z.lazy(() => PlanetWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlanetUpdateWithoutFlightsAsDestinationInputSchema),z.lazy(() => PlanetUncheckedUpdateWithoutFlightsAsDestinationInputSchema) ]),
}).strict();

export const PlanetUpdateWithoutFlightsAsDestinationInputSchema: z.ZodType<Prisma.PlanetUpdateWithoutFlightsAsDestinationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  terrain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  climate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flightsAsOrigin: z.lazy(() => FlightUpdateManyWithoutOriginNestedInputSchema).optional()
}).strict();

export const PlanetUncheckedUpdateWithoutFlightsAsDestinationInputSchema: z.ZodType<Prisma.PlanetUncheckedUpdateWithoutFlightsAsDestinationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  terrain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  climate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flightsAsOrigin: z.lazy(() => FlightUncheckedUpdateManyWithoutOriginNestedInputSchema).optional()
}).strict();

export const PlanetUpsertWithoutFlightsAsOriginInputSchema: z.ZodType<Prisma.PlanetUpsertWithoutFlightsAsOriginInput> = z.object({
  update: z.union([ z.lazy(() => PlanetUpdateWithoutFlightsAsOriginInputSchema),z.lazy(() => PlanetUncheckedUpdateWithoutFlightsAsOriginInputSchema) ]),
  create: z.union([ z.lazy(() => PlanetCreateWithoutFlightsAsOriginInputSchema),z.lazy(() => PlanetUncheckedCreateWithoutFlightsAsOriginInputSchema) ]),
  where: z.lazy(() => PlanetWhereInputSchema).optional()
}).strict();

export const PlanetUpdateToOneWithWhereWithoutFlightsAsOriginInputSchema: z.ZodType<Prisma.PlanetUpdateToOneWithWhereWithoutFlightsAsOriginInput> = z.object({
  where: z.lazy(() => PlanetWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlanetUpdateWithoutFlightsAsOriginInputSchema),z.lazy(() => PlanetUncheckedUpdateWithoutFlightsAsOriginInputSchema) ]),
}).strict();

export const PlanetUpdateWithoutFlightsAsOriginInputSchema: z.ZodType<Prisma.PlanetUpdateWithoutFlightsAsOriginInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  terrain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  climate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flightsAsDestination: z.lazy(() => FlightUpdateManyWithoutDestinationNestedInputSchema).optional()
}).strict();

export const PlanetUncheckedUpdateWithoutFlightsAsOriginInputSchema: z.ZodType<Prisma.PlanetUncheckedUpdateWithoutFlightsAsOriginInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  terrain: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  climate: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flightsAsDestination: z.lazy(() => FlightUncheckedUpdateManyWithoutDestinationNestedInputSchema).optional()
}).strict();

export const StarshipUpsertWithoutFlightsInputSchema: z.ZodType<Prisma.StarshipUpsertWithoutFlightsInput> = z.object({
  update: z.union([ z.lazy(() => StarshipUpdateWithoutFlightsInputSchema),z.lazy(() => StarshipUncheckedUpdateWithoutFlightsInputSchema) ]),
  create: z.union([ z.lazy(() => StarshipCreateWithoutFlightsInputSchema),z.lazy(() => StarshipUncheckedCreateWithoutFlightsInputSchema) ]),
  where: z.lazy(() => StarshipWhereInputSchema).optional()
}).strict();

export const StarshipUpdateToOneWithWhereWithoutFlightsInputSchema: z.ZodType<Prisma.StarshipUpdateToOneWithWhereWithoutFlightsInput> = z.object({
  where: z.lazy(() => StarshipWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StarshipUpdateWithoutFlightsInputSchema),z.lazy(() => StarshipUncheckedUpdateWithoutFlightsInputSchema) ]),
}).strict();

export const StarshipUpdateWithoutFlightsInputSchema: z.ZodType<Prisma.StarshipUpdateWithoutFlightsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  model: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  manufacturer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_atmosphering_speed: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  crew: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cargo_capacity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  hyperdrive_rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  MGLT: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starship_class: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StarshipUncheckedUpdateWithoutFlightsInputSchema: z.ZodType<Prisma.StarshipUncheckedUpdateWithoutFlightsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  model: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  manufacturer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  length: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  max_atmosphering_speed: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  crew: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cargo_capacity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  hyperdrive_rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  MGLT: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  starship_class: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUpsertWithoutCreatedFlightsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCreatedFlightsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCreatedFlightsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedFlightsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedFlightsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedFlightsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCreatedFlightsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedFlightsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCreatedFlightsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedFlightsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCreatedFlightsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCreatedFlightsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => ROLESchema),z.lazy(() => EnumROLEFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bookings: z.lazy(() => FlightUpdateManyWithoutBookedByNestedInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCreatedFlightsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCreatedFlightsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => ROLESchema),z.lazy(() => EnumROLEFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bookings: z.lazy(() => FlightUncheckedUpdateManyWithoutBookedByNestedInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutBookingsInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutBookingsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutBookingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBookingsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBookingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBookingsInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutBookingsInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutBookingsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutBookingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBookingsInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutBookingsInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutBookingsInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutBookingsInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumROLEFilterSchema),z.lazy(() => ROLESchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FlightCreateWithoutStarshipInputSchema: z.ZodType<Prisma.FlightCreateWithoutStarshipInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  cancelled: z.boolean().optional(),
  logo: z.string().optional().nullable(),
  destination: z.lazy(() => PlanetCreateNestedOneWithoutFlightsAsDestinationInputSchema),
  origin: z.lazy(() => PlanetCreateNestedOneWithoutFlightsAsOriginInputSchema),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedFlightsInputSchema),
  bookedBy: z.lazy(() => UserCreateNestedManyWithoutBookingsInputSchema).optional()
}).strict();

export const FlightUncheckedCreateWithoutStarshipInputSchema: z.ZodType<Prisma.FlightUncheckedCreateWithoutStarshipInput> = z.object({
  id: z.string().cuid().optional(),
  destinationId: z.string(),
  originId: z.string(),
  date: z.coerce.date(),
  cancelled: z.boolean().optional(),
  creatorId: z.string(),
  logo: z.string().optional().nullable(),
  bookedBy: z.lazy(() => UserUncheckedCreateNestedManyWithoutBookingsInputSchema).optional()
}).strict();

export const FlightCreateOrConnectWithoutStarshipInputSchema: z.ZodType<Prisma.FlightCreateOrConnectWithoutStarshipInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FlightCreateWithoutStarshipInputSchema),z.lazy(() => FlightUncheckedCreateWithoutStarshipInputSchema) ]),
}).strict();

export const FlightCreateManyStarshipInputEnvelopeSchema: z.ZodType<Prisma.FlightCreateManyStarshipInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FlightCreateManyStarshipInputSchema),z.lazy(() => FlightCreateManyStarshipInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FlightUpsertWithWhereUniqueWithoutStarshipInputSchema: z.ZodType<Prisma.FlightUpsertWithWhereUniqueWithoutStarshipInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FlightUpdateWithoutStarshipInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutStarshipInputSchema) ]),
  create: z.union([ z.lazy(() => FlightCreateWithoutStarshipInputSchema),z.lazy(() => FlightUncheckedCreateWithoutStarshipInputSchema) ]),
}).strict();

export const FlightUpdateWithWhereUniqueWithoutStarshipInputSchema: z.ZodType<Prisma.FlightUpdateWithWhereUniqueWithoutStarshipInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateWithoutStarshipInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutStarshipInputSchema) ]),
}).strict();

export const FlightUpdateManyWithWhereWithoutStarshipInputSchema: z.ZodType<Prisma.FlightUpdateManyWithWhereWithoutStarshipInput> = z.object({
  where: z.lazy(() => FlightScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateManyMutationInputSchema),z.lazy(() => FlightUncheckedUpdateManyWithoutStarshipInputSchema) ]),
}).strict();

export const FlightCreateWithoutDestinationInputSchema: z.ZodType<Prisma.FlightCreateWithoutDestinationInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  cancelled: z.boolean().optional(),
  logo: z.string().optional().nullable(),
  origin: z.lazy(() => PlanetCreateNestedOneWithoutFlightsAsOriginInputSchema),
  starship: z.lazy(() => StarshipCreateNestedOneWithoutFlightsInputSchema),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedFlightsInputSchema),
  bookedBy: z.lazy(() => UserCreateNestedManyWithoutBookingsInputSchema).optional()
}).strict();

export const FlightUncheckedCreateWithoutDestinationInputSchema: z.ZodType<Prisma.FlightUncheckedCreateWithoutDestinationInput> = z.object({
  id: z.string().cuid().optional(),
  originId: z.string(),
  date: z.coerce.date(),
  starshipId: z.string(),
  cancelled: z.boolean().optional(),
  creatorId: z.string(),
  logo: z.string().optional().nullable(),
  bookedBy: z.lazy(() => UserUncheckedCreateNestedManyWithoutBookingsInputSchema).optional()
}).strict();

export const FlightCreateOrConnectWithoutDestinationInputSchema: z.ZodType<Prisma.FlightCreateOrConnectWithoutDestinationInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FlightCreateWithoutDestinationInputSchema),z.lazy(() => FlightUncheckedCreateWithoutDestinationInputSchema) ]),
}).strict();

export const FlightCreateManyDestinationInputEnvelopeSchema: z.ZodType<Prisma.FlightCreateManyDestinationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FlightCreateManyDestinationInputSchema),z.lazy(() => FlightCreateManyDestinationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FlightCreateWithoutOriginInputSchema: z.ZodType<Prisma.FlightCreateWithoutOriginInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  cancelled: z.boolean().optional(),
  logo: z.string().optional().nullable(),
  destination: z.lazy(() => PlanetCreateNestedOneWithoutFlightsAsDestinationInputSchema),
  starship: z.lazy(() => StarshipCreateNestedOneWithoutFlightsInputSchema),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedFlightsInputSchema),
  bookedBy: z.lazy(() => UserCreateNestedManyWithoutBookingsInputSchema).optional()
}).strict();

export const FlightUncheckedCreateWithoutOriginInputSchema: z.ZodType<Prisma.FlightUncheckedCreateWithoutOriginInput> = z.object({
  id: z.string().cuid().optional(),
  destinationId: z.string(),
  date: z.coerce.date(),
  starshipId: z.string(),
  cancelled: z.boolean().optional(),
  creatorId: z.string(),
  logo: z.string().optional().nullable(),
  bookedBy: z.lazy(() => UserUncheckedCreateNestedManyWithoutBookingsInputSchema).optional()
}).strict();

export const FlightCreateOrConnectWithoutOriginInputSchema: z.ZodType<Prisma.FlightCreateOrConnectWithoutOriginInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FlightCreateWithoutOriginInputSchema),z.lazy(() => FlightUncheckedCreateWithoutOriginInputSchema) ]),
}).strict();

export const FlightCreateManyOriginInputEnvelopeSchema: z.ZodType<Prisma.FlightCreateManyOriginInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FlightCreateManyOriginInputSchema),z.lazy(() => FlightCreateManyOriginInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FlightUpsertWithWhereUniqueWithoutDestinationInputSchema: z.ZodType<Prisma.FlightUpsertWithWhereUniqueWithoutDestinationInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FlightUpdateWithoutDestinationInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutDestinationInputSchema) ]),
  create: z.union([ z.lazy(() => FlightCreateWithoutDestinationInputSchema),z.lazy(() => FlightUncheckedCreateWithoutDestinationInputSchema) ]),
}).strict();

export const FlightUpdateWithWhereUniqueWithoutDestinationInputSchema: z.ZodType<Prisma.FlightUpdateWithWhereUniqueWithoutDestinationInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateWithoutDestinationInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutDestinationInputSchema) ]),
}).strict();

export const FlightUpdateManyWithWhereWithoutDestinationInputSchema: z.ZodType<Prisma.FlightUpdateManyWithWhereWithoutDestinationInput> = z.object({
  where: z.lazy(() => FlightScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateManyMutationInputSchema),z.lazy(() => FlightUncheckedUpdateManyWithoutDestinationInputSchema) ]),
}).strict();

export const FlightUpsertWithWhereUniqueWithoutOriginInputSchema: z.ZodType<Prisma.FlightUpsertWithWhereUniqueWithoutOriginInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FlightUpdateWithoutOriginInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutOriginInputSchema) ]),
  create: z.union([ z.lazy(() => FlightCreateWithoutOriginInputSchema),z.lazy(() => FlightUncheckedCreateWithoutOriginInputSchema) ]),
}).strict();

export const FlightUpdateWithWhereUniqueWithoutOriginInputSchema: z.ZodType<Prisma.FlightUpdateWithWhereUniqueWithoutOriginInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateWithoutOriginInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutOriginInputSchema) ]),
}).strict();

export const FlightUpdateManyWithWhereWithoutOriginInputSchema: z.ZodType<Prisma.FlightUpdateManyWithWhereWithoutOriginInput> = z.object({
  where: z.lazy(() => FlightScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateManyMutationInputSchema),z.lazy(() => FlightUncheckedUpdateManyWithoutOriginInputSchema) ]),
}).strict();

export const UserCreateWithoutChatConversationsInputSchema: z.ZodType<Prisma.UserCreateWithoutChatConversationsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => ROLESchema).optional(),
  createdAt: z.coerce.date().optional(),
  bookings: z.lazy(() => FlightCreateNestedManyWithoutBookedByInputSchema).optional(),
  createdFlights: z.lazy(() => FlightCreateNestedManyWithoutCreatorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutChatConversationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutChatConversationsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => ROLESchema).optional(),
  createdAt: z.coerce.date().optional(),
  bookings: z.lazy(() => FlightUncheckedCreateNestedManyWithoutBookedByInputSchema).optional(),
  createdFlights: z.lazy(() => FlightUncheckedCreateNestedManyWithoutCreatorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutChatConversationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutChatConversationsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutChatConversationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatConversationsInputSchema) ]),
}).strict();

export const ChatMessageCreateWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageCreateWithoutConversationInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  isUser: z.boolean(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ChatMessageUncheckedCreateWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUncheckedCreateWithoutConversationInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  isUser: z.boolean(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ChatMessageCreateOrConnectWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageCreateOrConnectWithoutConversationInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export const ChatMessageCreateManyConversationInputEnvelopeSchema: z.ZodType<Prisma.ChatMessageCreateManyConversationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChatMessageCreateManyConversationInputSchema),z.lazy(() => ChatMessageCreateManyConversationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutChatConversationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutChatConversationsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutChatConversationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatConversationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutChatConversationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatConversationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutChatConversationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutChatConversationsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutChatConversationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatConversationsInputSchema) ]),
}).strict();

export const UserUpdateWithoutChatConversationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutChatConversationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => ROLESchema),z.lazy(() => EnumROLEFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bookings: z.lazy(() => FlightUpdateManyWithoutBookedByNestedInputSchema).optional(),
  createdFlights: z.lazy(() => FlightUpdateManyWithoutCreatorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutChatConversationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutChatConversationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => ROLESchema),z.lazy(() => EnumROLEFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bookings: z.lazy(() => FlightUncheckedUpdateManyWithoutBookedByNestedInputSchema).optional(),
  createdFlights: z.lazy(() => FlightUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional()
}).strict();

export const ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUpsertWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutConversationInputSchema) ]),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export const ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUpdateWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatMessageUpdateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutConversationInputSchema) ]),
}).strict();

export const ChatMessageUpdateManyWithWhereWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUpdateManyWithWhereWithoutConversationInput> = z.object({
  where: z.lazy(() => ChatMessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatMessageUpdateManyMutationInputSchema),z.lazy(() => ChatMessageUncheckedUpdateManyWithoutConversationInputSchema) ]),
}).strict();

export const ChatMessageScalarWhereInputSchema: z.ZodType<Prisma.ChatMessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isUser: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ChatConversationCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ChatConversationCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  character: z.lazy(() => ChatCharacterSchema),
  title: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutChatConversationsInputSchema)
}).strict();

export const ChatConversationUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ChatConversationUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  character: z.lazy(() => ChatCharacterSchema),
  title: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ChatConversationCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.ChatConversationCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => ChatConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatConversationCreateWithoutMessagesInputSchema),z.lazy(() => ChatConversationUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export const ChatConversationUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.ChatConversationUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => ChatConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ChatConversationUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => ChatConversationCreateWithoutMessagesInputSchema),z.lazy(() => ChatConversationUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => ChatConversationWhereInputSchema).optional()
}).strict();

export const ChatConversationUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.ChatConversationUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => ChatConversationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ChatConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ChatConversationUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export const ChatConversationUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ChatConversationUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => EnumChatCharacterFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutChatConversationsNestedInputSchema).optional()
}).strict();

export const ChatConversationUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ChatConversationUncheckedUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => EnumChatCharacterFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FlightCreateManyCreatorInputSchema: z.ZodType<Prisma.FlightCreateManyCreatorInput> = z.object({
  id: z.string().cuid().optional(),
  destinationId: z.string(),
  originId: z.string(),
  date: z.coerce.date(),
  starshipId: z.string(),
  cancelled: z.boolean().optional(),
  logo: z.string().optional().nullable()
}).strict();

export const ChatConversationCreateManyUserInputSchema: z.ZodType<Prisma.ChatConversationCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  character: z.lazy(() => ChatCharacterSchema),
  title: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FlightUpdateWithoutBookedByInputSchema: z.ZodType<Prisma.FlightUpdateWithoutBookedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination: z.lazy(() => PlanetUpdateOneRequiredWithoutFlightsAsDestinationNestedInputSchema).optional(),
  origin: z.lazy(() => PlanetUpdateOneRequiredWithoutFlightsAsOriginNestedInputSchema).optional(),
  starship: z.lazy(() => StarshipUpdateOneRequiredWithoutFlightsNestedInputSchema).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedFlightsNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateWithoutBookedByInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateWithoutBookedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destinationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  starshipId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightUncheckedUpdateManyWithoutBookedByInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutBookedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destinationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  starshipId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightUpdateWithoutCreatorInputSchema: z.ZodType<Prisma.FlightUpdateWithoutCreatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination: z.lazy(() => PlanetUpdateOneRequiredWithoutFlightsAsDestinationNestedInputSchema).optional(),
  origin: z.lazy(() => PlanetUpdateOneRequiredWithoutFlightsAsOriginNestedInputSchema).optional(),
  starship: z.lazy(() => StarshipUpdateOneRequiredWithoutFlightsNestedInputSchema).optional(),
  bookedBy: z.lazy(() => UserUpdateManyWithoutBookingsNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateWithoutCreatorInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateWithoutCreatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destinationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  starshipId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookedBy: z.lazy(() => UserUncheckedUpdateManyWithoutBookingsNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateManyWithoutCreatorInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutCreatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destinationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  starshipId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatConversationUpdateWithoutUserInputSchema: z.ZodType<Prisma.ChatConversationUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => EnumChatCharacterFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => ChatMessageUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ChatConversationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ChatConversationUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => EnumChatCharacterFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ChatConversationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ChatConversationUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  character: z.union([ z.lazy(() => ChatCharacterSchema),z.lazy(() => EnumChatCharacterFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpdateWithoutBookingsInputSchema: z.ZodType<Prisma.UserUpdateWithoutBookingsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => ROLESchema),z.lazy(() => EnumROLEFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdFlights: z.lazy(() => FlightUpdateManyWithoutCreatorNestedInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutBookingsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBookingsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => ROLESchema),z.lazy(() => EnumROLEFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdFlights: z.lazy(() => FlightUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  chatConversations: z.lazy(() => ChatConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutBookingsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutBookingsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => ROLESchema),z.lazy(() => EnumROLEFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FlightCreateManyStarshipInputSchema: z.ZodType<Prisma.FlightCreateManyStarshipInput> = z.object({
  id: z.string().cuid().optional(),
  destinationId: z.string(),
  originId: z.string(),
  date: z.coerce.date(),
  cancelled: z.boolean().optional(),
  creatorId: z.string(),
  logo: z.string().optional().nullable()
}).strict();

export const FlightUpdateWithoutStarshipInputSchema: z.ZodType<Prisma.FlightUpdateWithoutStarshipInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination: z.lazy(() => PlanetUpdateOneRequiredWithoutFlightsAsDestinationNestedInputSchema).optional(),
  origin: z.lazy(() => PlanetUpdateOneRequiredWithoutFlightsAsOriginNestedInputSchema).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedFlightsNestedInputSchema).optional(),
  bookedBy: z.lazy(() => UserUpdateManyWithoutBookingsNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateWithoutStarshipInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateWithoutStarshipInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destinationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookedBy: z.lazy(() => UserUncheckedUpdateManyWithoutBookingsNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateManyWithoutStarshipInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutStarshipInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destinationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightCreateManyDestinationInputSchema: z.ZodType<Prisma.FlightCreateManyDestinationInput> = z.object({
  id: z.string().cuid().optional(),
  originId: z.string(),
  date: z.coerce.date(),
  starshipId: z.string(),
  cancelled: z.boolean().optional(),
  creatorId: z.string(),
  logo: z.string().optional().nullable()
}).strict();

export const FlightCreateManyOriginInputSchema: z.ZodType<Prisma.FlightCreateManyOriginInput> = z.object({
  id: z.string().cuid().optional(),
  destinationId: z.string(),
  date: z.coerce.date(),
  starshipId: z.string(),
  cancelled: z.boolean().optional(),
  creatorId: z.string(),
  logo: z.string().optional().nullable()
}).strict();

export const FlightUpdateWithoutDestinationInputSchema: z.ZodType<Prisma.FlightUpdateWithoutDestinationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin: z.lazy(() => PlanetUpdateOneRequiredWithoutFlightsAsOriginNestedInputSchema).optional(),
  starship: z.lazy(() => StarshipUpdateOneRequiredWithoutFlightsNestedInputSchema).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedFlightsNestedInputSchema).optional(),
  bookedBy: z.lazy(() => UserUpdateManyWithoutBookingsNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateWithoutDestinationInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateWithoutDestinationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  starshipId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookedBy: z.lazy(() => UserUncheckedUpdateManyWithoutBookingsNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateManyWithoutDestinationInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutDestinationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  starshipId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightUpdateWithoutOriginInputSchema: z.ZodType<Prisma.FlightUpdateWithoutOriginInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination: z.lazy(() => PlanetUpdateOneRequiredWithoutFlightsAsDestinationNestedInputSchema).optional(),
  starship: z.lazy(() => StarshipUpdateOneRequiredWithoutFlightsNestedInputSchema).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedFlightsNestedInputSchema).optional(),
  bookedBy: z.lazy(() => UserUpdateManyWithoutBookingsNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateWithoutOriginInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateWithoutOriginInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destinationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  starshipId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookedBy: z.lazy(() => UserUncheckedUpdateManyWithoutBookingsNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateManyWithoutOriginInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutOriginInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destinationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  starshipId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatMessageCreateManyConversationInputSchema: z.ZodType<Prisma.ChatMessageCreateManyConversationInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  isUser: z.boolean(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ChatMessageUpdateWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUpdateWithoutConversationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageUncheckedUpdateWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateWithoutConversationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageUncheckedUpdateManyWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateManyWithoutConversationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isUser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const FlightFindFirstArgsSchema: z.ZodType<Prisma.FlightFindFirstArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereInputSchema.optional(),
  orderBy: z.union([ FlightOrderByWithRelationInputSchema.array(),FlightOrderByWithRelationInputSchema ]).optional(),
  cursor: FlightWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FlightScalarFieldEnumSchema,FlightScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FlightFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FlightFindFirstOrThrowArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereInputSchema.optional(),
  orderBy: z.union([ FlightOrderByWithRelationInputSchema.array(),FlightOrderByWithRelationInputSchema ]).optional(),
  cursor: FlightWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FlightScalarFieldEnumSchema,FlightScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FlightFindManyArgsSchema: z.ZodType<Prisma.FlightFindManyArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereInputSchema.optional(),
  orderBy: z.union([ FlightOrderByWithRelationInputSchema.array(),FlightOrderByWithRelationInputSchema ]).optional(),
  cursor: FlightWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FlightScalarFieldEnumSchema,FlightScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FlightAggregateArgsSchema: z.ZodType<Prisma.FlightAggregateArgs> = z.object({
  where: FlightWhereInputSchema.optional(),
  orderBy: z.union([ FlightOrderByWithRelationInputSchema.array(),FlightOrderByWithRelationInputSchema ]).optional(),
  cursor: FlightWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FlightGroupByArgsSchema: z.ZodType<Prisma.FlightGroupByArgs> = z.object({
  where: FlightWhereInputSchema.optional(),
  orderBy: z.union([ FlightOrderByWithAggregationInputSchema.array(),FlightOrderByWithAggregationInputSchema ]).optional(),
  by: FlightScalarFieldEnumSchema.array(),
  having: FlightScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FlightFindUniqueArgsSchema: z.ZodType<Prisma.FlightFindUniqueArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereUniqueInputSchema,
}).strict() ;

export const FlightFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FlightFindUniqueOrThrowArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereUniqueInputSchema,
}).strict() ;

export const StarshipFindFirstArgsSchema: z.ZodType<Prisma.StarshipFindFirstArgs> = z.object({
  select: StarshipSelectSchema.optional(),
  include: StarshipIncludeSchema.optional(),
  where: StarshipWhereInputSchema.optional(),
  orderBy: z.union([ StarshipOrderByWithRelationInputSchema.array(),StarshipOrderByWithRelationInputSchema ]).optional(),
  cursor: StarshipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StarshipScalarFieldEnumSchema,StarshipScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StarshipFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StarshipFindFirstOrThrowArgs> = z.object({
  select: StarshipSelectSchema.optional(),
  include: StarshipIncludeSchema.optional(),
  where: StarshipWhereInputSchema.optional(),
  orderBy: z.union([ StarshipOrderByWithRelationInputSchema.array(),StarshipOrderByWithRelationInputSchema ]).optional(),
  cursor: StarshipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StarshipScalarFieldEnumSchema,StarshipScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StarshipFindManyArgsSchema: z.ZodType<Prisma.StarshipFindManyArgs> = z.object({
  select: StarshipSelectSchema.optional(),
  include: StarshipIncludeSchema.optional(),
  where: StarshipWhereInputSchema.optional(),
  orderBy: z.union([ StarshipOrderByWithRelationInputSchema.array(),StarshipOrderByWithRelationInputSchema ]).optional(),
  cursor: StarshipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StarshipScalarFieldEnumSchema,StarshipScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StarshipAggregateArgsSchema: z.ZodType<Prisma.StarshipAggregateArgs> = z.object({
  where: StarshipWhereInputSchema.optional(),
  orderBy: z.union([ StarshipOrderByWithRelationInputSchema.array(),StarshipOrderByWithRelationInputSchema ]).optional(),
  cursor: StarshipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StarshipGroupByArgsSchema: z.ZodType<Prisma.StarshipGroupByArgs> = z.object({
  where: StarshipWhereInputSchema.optional(),
  orderBy: z.union([ StarshipOrderByWithAggregationInputSchema.array(),StarshipOrderByWithAggregationInputSchema ]).optional(),
  by: StarshipScalarFieldEnumSchema.array(),
  having: StarshipScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StarshipFindUniqueArgsSchema: z.ZodType<Prisma.StarshipFindUniqueArgs> = z.object({
  select: StarshipSelectSchema.optional(),
  include: StarshipIncludeSchema.optional(),
  where: StarshipWhereUniqueInputSchema,
}).strict() ;

export const StarshipFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StarshipFindUniqueOrThrowArgs> = z.object({
  select: StarshipSelectSchema.optional(),
  include: StarshipIncludeSchema.optional(),
  where: StarshipWhereUniqueInputSchema,
}).strict() ;

export const PlanetFindFirstArgsSchema: z.ZodType<Prisma.PlanetFindFirstArgs> = z.object({
  select: PlanetSelectSchema.optional(),
  include: PlanetIncludeSchema.optional(),
  where: PlanetWhereInputSchema.optional(),
  orderBy: z.union([ PlanetOrderByWithRelationInputSchema.array(),PlanetOrderByWithRelationInputSchema ]).optional(),
  cursor: PlanetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlanetScalarFieldEnumSchema,PlanetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlanetFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PlanetFindFirstOrThrowArgs> = z.object({
  select: PlanetSelectSchema.optional(),
  include: PlanetIncludeSchema.optional(),
  where: PlanetWhereInputSchema.optional(),
  orderBy: z.union([ PlanetOrderByWithRelationInputSchema.array(),PlanetOrderByWithRelationInputSchema ]).optional(),
  cursor: PlanetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlanetScalarFieldEnumSchema,PlanetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlanetFindManyArgsSchema: z.ZodType<Prisma.PlanetFindManyArgs> = z.object({
  select: PlanetSelectSchema.optional(),
  include: PlanetIncludeSchema.optional(),
  where: PlanetWhereInputSchema.optional(),
  orderBy: z.union([ PlanetOrderByWithRelationInputSchema.array(),PlanetOrderByWithRelationInputSchema ]).optional(),
  cursor: PlanetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlanetScalarFieldEnumSchema,PlanetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlanetAggregateArgsSchema: z.ZodType<Prisma.PlanetAggregateArgs> = z.object({
  where: PlanetWhereInputSchema.optional(),
  orderBy: z.union([ PlanetOrderByWithRelationInputSchema.array(),PlanetOrderByWithRelationInputSchema ]).optional(),
  cursor: PlanetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlanetGroupByArgsSchema: z.ZodType<Prisma.PlanetGroupByArgs> = z.object({
  where: PlanetWhereInputSchema.optional(),
  orderBy: z.union([ PlanetOrderByWithAggregationInputSchema.array(),PlanetOrderByWithAggregationInputSchema ]).optional(),
  by: PlanetScalarFieldEnumSchema.array(),
  having: PlanetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlanetFindUniqueArgsSchema: z.ZodType<Prisma.PlanetFindUniqueArgs> = z.object({
  select: PlanetSelectSchema.optional(),
  include: PlanetIncludeSchema.optional(),
  where: PlanetWhereUniqueInputSchema,
}).strict() ;

export const PlanetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PlanetFindUniqueOrThrowArgs> = z.object({
  select: PlanetSelectSchema.optional(),
  include: PlanetIncludeSchema.optional(),
  where: PlanetWhereUniqueInputSchema,
}).strict() ;

export const ChatConversationFindFirstArgsSchema: z.ZodType<Prisma.ChatConversationFindFirstArgs> = z.object({
  select: ChatConversationSelectSchema.optional(),
  include: ChatConversationIncludeSchema.optional(),
  where: ChatConversationWhereInputSchema.optional(),
  orderBy: z.union([ ChatConversationOrderByWithRelationInputSchema.array(),ChatConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatConversationScalarFieldEnumSchema,ChatConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChatConversationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChatConversationFindFirstOrThrowArgs> = z.object({
  select: ChatConversationSelectSchema.optional(),
  include: ChatConversationIncludeSchema.optional(),
  where: ChatConversationWhereInputSchema.optional(),
  orderBy: z.union([ ChatConversationOrderByWithRelationInputSchema.array(),ChatConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatConversationScalarFieldEnumSchema,ChatConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChatConversationFindManyArgsSchema: z.ZodType<Prisma.ChatConversationFindManyArgs> = z.object({
  select: ChatConversationSelectSchema.optional(),
  include: ChatConversationIncludeSchema.optional(),
  where: ChatConversationWhereInputSchema.optional(),
  orderBy: z.union([ ChatConversationOrderByWithRelationInputSchema.array(),ChatConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatConversationScalarFieldEnumSchema,ChatConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChatConversationAggregateArgsSchema: z.ZodType<Prisma.ChatConversationAggregateArgs> = z.object({
  where: ChatConversationWhereInputSchema.optional(),
  orderBy: z.union([ ChatConversationOrderByWithRelationInputSchema.array(),ChatConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ChatConversationGroupByArgsSchema: z.ZodType<Prisma.ChatConversationGroupByArgs> = z.object({
  where: ChatConversationWhereInputSchema.optional(),
  orderBy: z.union([ ChatConversationOrderByWithAggregationInputSchema.array(),ChatConversationOrderByWithAggregationInputSchema ]).optional(),
  by: ChatConversationScalarFieldEnumSchema.array(),
  having: ChatConversationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ChatConversationFindUniqueArgsSchema: z.ZodType<Prisma.ChatConversationFindUniqueArgs> = z.object({
  select: ChatConversationSelectSchema.optional(),
  include: ChatConversationIncludeSchema.optional(),
  where: ChatConversationWhereUniqueInputSchema,
}).strict() ;

export const ChatConversationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChatConversationFindUniqueOrThrowArgs> = z.object({
  select: ChatConversationSelectSchema.optional(),
  include: ChatConversationIncludeSchema.optional(),
  where: ChatConversationWhereUniqueInputSchema,
}).strict() ;

export const ChatMessageFindFirstArgsSchema: z.ZodType<Prisma.ChatMessageFindFirstArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithRelationInputSchema.array(),ChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatMessageScalarFieldEnumSchema,ChatMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChatMessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChatMessageFindFirstOrThrowArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithRelationInputSchema.array(),ChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatMessageScalarFieldEnumSchema,ChatMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChatMessageFindManyArgsSchema: z.ZodType<Prisma.ChatMessageFindManyArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithRelationInputSchema.array(),ChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatMessageScalarFieldEnumSchema,ChatMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChatMessageAggregateArgsSchema: z.ZodType<Prisma.ChatMessageAggregateArgs> = z.object({
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithRelationInputSchema.array(),ChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ChatMessageGroupByArgsSchema: z.ZodType<Prisma.ChatMessageGroupByArgs> = z.object({
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithAggregationInputSchema.array(),ChatMessageOrderByWithAggregationInputSchema ]).optional(),
  by: ChatMessageScalarFieldEnumSchema.array(),
  having: ChatMessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ChatMessageFindUniqueArgsSchema: z.ZodType<Prisma.ChatMessageFindUniqueArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereUniqueInputSchema,
}).strict() ;

export const ChatMessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChatMessageFindUniqueOrThrowArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FlightCreateArgsSchema: z.ZodType<Prisma.FlightCreateArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  data: z.union([ FlightCreateInputSchema,FlightUncheckedCreateInputSchema ]),
}).strict() ;

export const FlightUpsertArgsSchema: z.ZodType<Prisma.FlightUpsertArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereUniqueInputSchema,
  create: z.union([ FlightCreateInputSchema,FlightUncheckedCreateInputSchema ]),
  update: z.union([ FlightUpdateInputSchema,FlightUncheckedUpdateInputSchema ]),
}).strict() ;

export const FlightCreateManyArgsSchema: z.ZodType<Prisma.FlightCreateManyArgs> = z.object({
  data: z.union([ FlightCreateManyInputSchema,FlightCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FlightCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FlightCreateManyAndReturnArgs> = z.object({
  data: z.union([ FlightCreateManyInputSchema,FlightCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FlightDeleteArgsSchema: z.ZodType<Prisma.FlightDeleteArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereUniqueInputSchema,
}).strict() ;

export const FlightUpdateArgsSchema: z.ZodType<Prisma.FlightUpdateArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  data: z.union([ FlightUpdateInputSchema,FlightUncheckedUpdateInputSchema ]),
  where: FlightWhereUniqueInputSchema,
}).strict() ;

export const FlightUpdateManyArgsSchema: z.ZodType<Prisma.FlightUpdateManyArgs> = z.object({
  data: z.union([ FlightUpdateManyMutationInputSchema,FlightUncheckedUpdateManyInputSchema ]),
  where: FlightWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FlightUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FlightUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FlightUpdateManyMutationInputSchema,FlightUncheckedUpdateManyInputSchema ]),
  where: FlightWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FlightDeleteManyArgsSchema: z.ZodType<Prisma.FlightDeleteManyArgs> = z.object({
  where: FlightWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StarshipCreateArgsSchema: z.ZodType<Prisma.StarshipCreateArgs> = z.object({
  select: StarshipSelectSchema.optional(),
  include: StarshipIncludeSchema.optional(),
  data: z.union([ StarshipCreateInputSchema,StarshipUncheckedCreateInputSchema ]),
}).strict() ;

export const StarshipUpsertArgsSchema: z.ZodType<Prisma.StarshipUpsertArgs> = z.object({
  select: StarshipSelectSchema.optional(),
  include: StarshipIncludeSchema.optional(),
  where: StarshipWhereUniqueInputSchema,
  create: z.union([ StarshipCreateInputSchema,StarshipUncheckedCreateInputSchema ]),
  update: z.union([ StarshipUpdateInputSchema,StarshipUncheckedUpdateInputSchema ]),
}).strict() ;

export const StarshipCreateManyArgsSchema: z.ZodType<Prisma.StarshipCreateManyArgs> = z.object({
  data: z.union([ StarshipCreateManyInputSchema,StarshipCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StarshipCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StarshipCreateManyAndReturnArgs> = z.object({
  data: z.union([ StarshipCreateManyInputSchema,StarshipCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StarshipDeleteArgsSchema: z.ZodType<Prisma.StarshipDeleteArgs> = z.object({
  select: StarshipSelectSchema.optional(),
  include: StarshipIncludeSchema.optional(),
  where: StarshipWhereUniqueInputSchema,
}).strict() ;

export const StarshipUpdateArgsSchema: z.ZodType<Prisma.StarshipUpdateArgs> = z.object({
  select: StarshipSelectSchema.optional(),
  include: StarshipIncludeSchema.optional(),
  data: z.union([ StarshipUpdateInputSchema,StarshipUncheckedUpdateInputSchema ]),
  where: StarshipWhereUniqueInputSchema,
}).strict() ;

export const StarshipUpdateManyArgsSchema: z.ZodType<Prisma.StarshipUpdateManyArgs> = z.object({
  data: z.union([ StarshipUpdateManyMutationInputSchema,StarshipUncheckedUpdateManyInputSchema ]),
  where: StarshipWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StarshipUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.StarshipUpdateManyAndReturnArgs> = z.object({
  data: z.union([ StarshipUpdateManyMutationInputSchema,StarshipUncheckedUpdateManyInputSchema ]),
  where: StarshipWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StarshipDeleteManyArgsSchema: z.ZodType<Prisma.StarshipDeleteManyArgs> = z.object({
  where: StarshipWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PlanetCreateArgsSchema: z.ZodType<Prisma.PlanetCreateArgs> = z.object({
  select: PlanetSelectSchema.optional(),
  include: PlanetIncludeSchema.optional(),
  data: z.union([ PlanetCreateInputSchema,PlanetUncheckedCreateInputSchema ]),
}).strict() ;

export const PlanetUpsertArgsSchema: z.ZodType<Prisma.PlanetUpsertArgs> = z.object({
  select: PlanetSelectSchema.optional(),
  include: PlanetIncludeSchema.optional(),
  where: PlanetWhereUniqueInputSchema,
  create: z.union([ PlanetCreateInputSchema,PlanetUncheckedCreateInputSchema ]),
  update: z.union([ PlanetUpdateInputSchema,PlanetUncheckedUpdateInputSchema ]),
}).strict() ;

export const PlanetCreateManyArgsSchema: z.ZodType<Prisma.PlanetCreateManyArgs> = z.object({
  data: z.union([ PlanetCreateManyInputSchema,PlanetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PlanetCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PlanetCreateManyAndReturnArgs> = z.object({
  data: z.union([ PlanetCreateManyInputSchema,PlanetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PlanetDeleteArgsSchema: z.ZodType<Prisma.PlanetDeleteArgs> = z.object({
  select: PlanetSelectSchema.optional(),
  include: PlanetIncludeSchema.optional(),
  where: PlanetWhereUniqueInputSchema,
}).strict() ;

export const PlanetUpdateArgsSchema: z.ZodType<Prisma.PlanetUpdateArgs> = z.object({
  select: PlanetSelectSchema.optional(),
  include: PlanetIncludeSchema.optional(),
  data: z.union([ PlanetUpdateInputSchema,PlanetUncheckedUpdateInputSchema ]),
  where: PlanetWhereUniqueInputSchema,
}).strict() ;

export const PlanetUpdateManyArgsSchema: z.ZodType<Prisma.PlanetUpdateManyArgs> = z.object({
  data: z.union([ PlanetUpdateManyMutationInputSchema,PlanetUncheckedUpdateManyInputSchema ]),
  where: PlanetWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PlanetUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PlanetUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PlanetUpdateManyMutationInputSchema,PlanetUncheckedUpdateManyInputSchema ]),
  where: PlanetWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PlanetDeleteManyArgsSchema: z.ZodType<Prisma.PlanetDeleteManyArgs> = z.object({
  where: PlanetWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ChatConversationCreateArgsSchema: z.ZodType<Prisma.ChatConversationCreateArgs> = z.object({
  select: ChatConversationSelectSchema.optional(),
  include: ChatConversationIncludeSchema.optional(),
  data: z.union([ ChatConversationCreateInputSchema,ChatConversationUncheckedCreateInputSchema ]),
}).strict() ;

export const ChatConversationUpsertArgsSchema: z.ZodType<Prisma.ChatConversationUpsertArgs> = z.object({
  select: ChatConversationSelectSchema.optional(),
  include: ChatConversationIncludeSchema.optional(),
  where: ChatConversationWhereUniqueInputSchema,
  create: z.union([ ChatConversationCreateInputSchema,ChatConversationUncheckedCreateInputSchema ]),
  update: z.union([ ChatConversationUpdateInputSchema,ChatConversationUncheckedUpdateInputSchema ]),
}).strict() ;

export const ChatConversationCreateManyArgsSchema: z.ZodType<Prisma.ChatConversationCreateManyArgs> = z.object({
  data: z.union([ ChatConversationCreateManyInputSchema,ChatConversationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ChatConversationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ChatConversationCreateManyAndReturnArgs> = z.object({
  data: z.union([ ChatConversationCreateManyInputSchema,ChatConversationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ChatConversationDeleteArgsSchema: z.ZodType<Prisma.ChatConversationDeleteArgs> = z.object({
  select: ChatConversationSelectSchema.optional(),
  include: ChatConversationIncludeSchema.optional(),
  where: ChatConversationWhereUniqueInputSchema,
}).strict() ;

export const ChatConversationUpdateArgsSchema: z.ZodType<Prisma.ChatConversationUpdateArgs> = z.object({
  select: ChatConversationSelectSchema.optional(),
  include: ChatConversationIncludeSchema.optional(),
  data: z.union([ ChatConversationUpdateInputSchema,ChatConversationUncheckedUpdateInputSchema ]),
  where: ChatConversationWhereUniqueInputSchema,
}).strict() ;

export const ChatConversationUpdateManyArgsSchema: z.ZodType<Prisma.ChatConversationUpdateManyArgs> = z.object({
  data: z.union([ ChatConversationUpdateManyMutationInputSchema,ChatConversationUncheckedUpdateManyInputSchema ]),
  where: ChatConversationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ChatConversationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ChatConversationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ChatConversationUpdateManyMutationInputSchema,ChatConversationUncheckedUpdateManyInputSchema ]),
  where: ChatConversationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ChatConversationDeleteManyArgsSchema: z.ZodType<Prisma.ChatConversationDeleteManyArgs> = z.object({
  where: ChatConversationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ChatMessageCreateArgsSchema: z.ZodType<Prisma.ChatMessageCreateArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  data: z.union([ ChatMessageCreateInputSchema,ChatMessageUncheckedCreateInputSchema ]),
}).strict() ;

export const ChatMessageUpsertArgsSchema: z.ZodType<Prisma.ChatMessageUpsertArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereUniqueInputSchema,
  create: z.union([ ChatMessageCreateInputSchema,ChatMessageUncheckedCreateInputSchema ]),
  update: z.union([ ChatMessageUpdateInputSchema,ChatMessageUncheckedUpdateInputSchema ]),
}).strict() ;

export const ChatMessageCreateManyArgsSchema: z.ZodType<Prisma.ChatMessageCreateManyArgs> = z.object({
  data: z.union([ ChatMessageCreateManyInputSchema,ChatMessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ChatMessageCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ChatMessageCreateManyAndReturnArgs> = z.object({
  data: z.union([ ChatMessageCreateManyInputSchema,ChatMessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ChatMessageDeleteArgsSchema: z.ZodType<Prisma.ChatMessageDeleteArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereUniqueInputSchema,
}).strict() ;

export const ChatMessageUpdateArgsSchema: z.ZodType<Prisma.ChatMessageUpdateArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  data: z.union([ ChatMessageUpdateInputSchema,ChatMessageUncheckedUpdateInputSchema ]),
  where: ChatMessageWhereUniqueInputSchema,
}).strict() ;

export const ChatMessageUpdateManyArgsSchema: z.ZodType<Prisma.ChatMessageUpdateManyArgs> = z.object({
  data: z.union([ ChatMessageUpdateManyMutationInputSchema,ChatMessageUncheckedUpdateManyInputSchema ]),
  where: ChatMessageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ChatMessageUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ChatMessageUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ChatMessageUpdateManyMutationInputSchema,ChatMessageUncheckedUpdateManyInputSchema ]),
  where: ChatMessageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ChatMessageDeleteManyArgsSchema: z.ZodType<Prisma.ChatMessageDeleteManyArgs> = z.object({
  where: ChatMessageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;