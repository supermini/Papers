from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db')
db = SQLAlchemy(app)

class NonConformity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='Open')

    def __repr__(self):
        return f'<NonConformity {self.id}>'

@app.route('/')
def index():
    non_conformities = NonConformity.query.all()
    return render_template('index.html', non_conformities=non_conformities)

@app.route('/add', methods=['GET', 'POST'])
def add():
    if request.method == 'POST':
        description = request.form['description']
        date_str = request.form['date']
        date = datetime.strptime(date_str, '%Y-%m-%d').date()
        new_nc = NonConformity(description=description, date=date)
        db.session.add(new_nc)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('add.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
