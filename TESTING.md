### Credentials
* user / user
* admin / admin

### Forbidden Queries and Mutations

Forbidden queries could be tested by login with `user \ user` and trying to access `Owner` screens. 
All `owner` GraphQL queries and mutations available only for `admin`.

### Error Boundaries

Error boundaries could be tested by modifying code of generated frontend app.

* `ScreenErrorBoundary` for example by adding 
```typescript
  throw Error();
```
before `return` statement in [EditorForm function](example-app/src/app/screens/management/PetCardsEditor.tsx#L126-L125) 
in `PetCardsEditor.tsx`.

* `AppErrorBoundary` by adding
```typescript
  throw Error();
```
in code outside screens, for example before `return` statement in [AppMenu](example-app/src/app/menu/Menu.tsx#L363).

### Internal Server Error

To reproduce internal server error, code
```
    throw new RuntimeException();
```
should be added in backend GraphQL controller method, which process query or mutation used in screen.

For example, for `Owner` collection screen, which used owner list without a filter, 
we can replace `OwnerController::findAll` with 

```java
    public OwnerDTO findById(@GraphQLId @Argument Long id) {
        throw new RuntimeException();
    }
```
 
### Bean Validation

Validation messages could be tested by submitting form with data below
```
mutation {
  updatePet(input: {
    identificationNumber: "@@@###",
    birthDate: "2011-01-01"
  }) {
    id
  }
}
```

### X to Many Relations

At this moment generated app doesn't allow to assign `many to many` relation between entities via screens.
We can use GraphiQL instead (tags with id `1`,`2` and `3` shoud be exist in DB)
```
mutation {
  updatePet(input: {
    identificationNumber: "00011",
    tags: [
      {id: 1},
      {id: 2},
      {id: 3},
    ]
  }) {
    id
    identificationNumber,
    tags {
      id
    }
  }
}
```

