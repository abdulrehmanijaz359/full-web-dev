// Angular demo: Angular CLI, standalone component with signals (Angular 17+)
//   npm install -g @angular/cli && ng new demo
// Replace src/app/app.component.ts (or app.ts in newer CLI versions) with this file,
// and paste shared.css into src/styles.css.
import { Component, signal, computed } from '@angular/core';

interface Todo { id: number; title: string; done: boolean; }

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="app">
      <h1>Angular demo</h1>

      <section class="card">
        <h2>Counter</h2>
        <div class="counter">
          <button class="ghost" (click)="count.set(count() - 1)">−</button>
          <output>{{ count() }}</output>
          <button (click)="count.set(count() + 1)">+</button>
        </div>
      </section>

      <section class="card">
        <h2>To-do list</h2>
        <div class="add">
          <input #field placeholder="What needs doing?"
                 (keydown.enter)="addTodo(field)" />
          <button (click)="addTodo(field)">Add</button>
        </div>

        @if (todos().length === 0) {
          <p class="empty">Nothing here yet. Add your first task.</p>
        } @else {
          <ul>
            @for (t of todos(); track t.id) {
              <li [class.done]="t.done">
                <input type="checkbox" [checked]="t.done" (change)="toggle(t.id)" />
                <span>{{ t.title }}</span>
                <button class="ghost" (click)="remove(t.id)">Remove</button>
              </li>
            }
          </ul>
        }
        <p class="summary">{{ remaining() }} of {{ todos().length }} tasks left</p>
      </section>
    </main>
  `,
})
export class AppComponent {
  count = signal(0);
  todos = signal<Todo[]>([]);
  remaining = computed(() => this.todos().filter(t => !t.done).length);

  addTodo(field: HTMLInputElement) {
    const title = field.value.trim();
    if (!title) return;
    this.todos.update(list => [...list, { id: Date.now(), title, done: false }]);
    field.value = '';
  }

  toggle(id: number) {
    this.todos.update(list => list.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  remove(id: number) {
    this.todos.update(list => list.filter(t => t.id !== id));
  }
}
