from flask import Flask, render_template, request, jsonify
import subprocess
import psutil
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tryon_process = None

# Sample recommendations data
recommendations = {
    'sunglasses1.png': ['sunglasses2.png', 'sunglasses3.png', 'sunglasses4.png'],
    'sunglasses2.png': ['sunglasses1.png', 'sunglasses3.png', 'sunglasses4.png', 'sunglasses5.png'],
    'sunglasses3.png': ['sunglasses1.png', 'sunglasses2.png', 'sunglasses4.png', 'sunglasses5.png'],
    'Watch1.png': ['Watch2.png', 'Watch3.png', 'Watch4.png'],
    'Watch2.png': ['Watch1.png', 'Watch3.png', 'Watch4.png'],
    'Watch3.png': ['Watch1.png', 'Watch2.png', 'Watch4.png'],
    'Neck1.png': ['Neck2.png', 'Neck3.png', 'Neck4.png'],
    'Neck2.png': ['Neck1.png', 'Neck3.png', 'Neck4.png'],
    'Neck3.png': ['Neck1.png', 'Neck2.png', 'Neck4.png'],
    'tshirt1.png': ['tshirt2.png', 'tshirt3.png'],
    'tshirt2.png': ['tshirt1.png', 'tshirt3.png'],
    'tshirt3.png': ['tshirt1.png', 'tshirt2.png']
}

@app.route('/')
def welcome():
    print("Serving index.html")
    return render_template('index.html')

@app.route('/home')
def index():
    print("Serving index.html from /home")
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        print(f"Contact Form Submission: Name={name}, Email={email}, Message={message}")
        return render_template('contact.html', form_submitted=True)
    return render_template('contact.html', form_submitted=False)

@app.route('/tryon')
def tryon():
    print("Serving index.html from /tryon")
    return welcome()

@app.route('/try-now')
def try_now():
    global tryon_process
    item_type = request.args.get('type', 'sunglasses')
    item_image = request.args.get('item', 'sunglasses1.png')
    
    print(f"Try-now called with type={item_type}, item={item_image}")
    
    if tryon_process and tryon_process.poll() is None:
        for child in psutil.Process(tryon_process.pid).children(recursive=True):
            child.terminate()
        tryon_process.terminate()
        print("Terminated existing try-on process")
    
    script_map = {
        'sunglasses': 'sunglasses_tryon.py',
        'watch': 'watch_tryon.py',
        'necklace': 'necklace_tryon.py',
        'tshirt': 'tshirt_tryon.py'
    }
    
    script_name = script_map.get(item_type)
    if script_name:
        script_path = os.path.join('tryon_modules', script_name)
        image_path = os.path.join('static', item_image)
        print(f"Attempting to run script: {script_path} with image: {image_path}")
        if os.path.exists(script_path) and os.path.exists(image_path):
            try:
                tryon_process = subprocess.Popen(['python', script_path, image_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                stdout, stderr = tryon_process.communicate(timeout=10)
                print(f"Started try-on process with PID: {tryon_process.pid}")
                print(f"Script output: {stdout.decode()}")
                if stderr:
                    print(f"Script error: {stderr.decode()}")
            except subprocess.TimeoutExpired:
                print("Try-on script timed out")
                tryon_process.terminate()
                return render_template('index.html', error="Try-on script timed out")
            except Exception as e:
                print(f"Error running try-on script: {str(e)}")
                return render_template('index.html', error=f"Error running try-on script: {str(e)}")
        else:
            print(f"Script or image not found: {script_path}, {image_path}")
            return render_template('index.html', error=f"Script or image not found: {item_type}")
    else:
        print(f"Invalid item type: {item_type}")
        return render_template('index.html', error=f"Invalid item type: {item_type}")
    
    related_products = recommendations.get(item_image, [])
    return render_template('close.html', item_type=item_type, item_image=item_image, recommendations=related_products)

@app.route('/start-tryon', methods=['POST'])
def start_tryon():
    global tryon_process
    item_type = request.json.get('type')
    item_image = request.json.get('item')
    
    print(f"Start-tryon called with type={item_type}, item={item_image}")
    
    if tryon_process and tryon_process.poll() is None:
        for child in psutil.Process(tryon_process.pid).children(recursive=True):
            child.terminate()
        tryon_process.terminate()
        print("Terminated existing try-on process")
    
    script_map = {
        'sunglasses': 'sunglasses_tryon.py',
        'watch': 'watch_tryon.py',
        'necklace': 'necklace_tryon.py',
        'tshirt': 'tshirt_tryon.py'
    }
    
    script_name = script_map.get(item_type)
    if not script_name:
        return jsonify({"success": False, "message": f"Try-on not supported for {item_type}"})
    
    script_path = os.path.join('tryon_modules', script_name)
    image_path = os.path.join('static', item_image)
    
    if os.path.exists(script_path):
        try:
            tryon_process = subprocess.Popen(['python', script_path, image_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            stdout, stderr = tryon_process.communicate(timeout=10)
            print(f"Started try-on process with PID: {tryon_process.pid}")
            print(f"Script output: {stdout.decode()}")
            if stderr:
                print(f"Script error: {stderr.decode()}")
            return jsonify({"success": True, "message": f"Virtual try-on initiated for {item_image}"})
        except subprocess.TimeoutExpired:
            print("Try-on script timed out")
            tryon_process.terminate()
            return jsonify({"success": False, "message": "Try-on script timed out"})
        except Exception as e:
            print(f"Error running try-on script: {str(e)}")
            return jsonify({"success": False, "message": f"Error running try-on script: {str(e)}"})
    else:
        print(f"Try-on script not found: {script_path}")
        return jsonify({"success": False, "message": f"Try-on script for {item_type} not found."})

@app.route('/close-tryon')
def close_tryon():
    global tryon_process
    if tryon_process and tryon_process.poll() is None:
        for child in psutil.Process(tryon_process.pid).children(recursive=True):
            child.terminate()
        tryon_process.terminate()
        print("Closed try-on process")
    
    return render_template('index.html')

@app.route('/recommendations/<item_image>', methods=['GET'])
def get_recommendations(item_image):
    related_products = recommendations.get(item_image, [])
    return jsonify(related_products)

if __name__ == '__main__':
    app.run(debug=True, port=5001)